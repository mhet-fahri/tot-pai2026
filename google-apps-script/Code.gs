/**
 * BACKEND RESMI PELATIHAN GURU PAI
 * Google Apps Script Web App (Code.gs)
 * 
 * Penyelenggara:
 * - Direktorat PAI Kementerian Agama Republik Indonesia
 * - Fakultas Ilmu Tarbiyah dan Keguruan UIN Syarif Hidayatullah Jakarta
 * 
 * FITUR UTAMA:
 * 1. Otomatis inisialisasi sheet & struktur kolom jika spreadsheet masih baru (Auto-Setup Sheet).
 * 2. Sinkronisasi Data Peserta (Register/Update Profile tanpa login akun).
 * 3. Unggah Berkas Lembar Kerja (Worksheet) ke Google Drive otomatis terorganisir per folder:
 *    "Pelatihan_Guru_PAI/Hari_{X}/{Asal_Sekolah}_{Nama_Peserta}/..."
 * 4. Pengelolaan Tautan Bahan Tayang (PPT) & Pretest/Form secara realtime dari panel web.
 * 5. Evaluasi & Rekap Nilai oleh Fasilitator terlindungi Secret Key.
 * 6. Penanganan CORS & respon JSON standar industri.
 */

// Konfigurasi Standar
var CONFIG = {
  ADMIN_SECRET_KEY: "tot-sulthan-2026", // Default key (dapat dioverride di Project Settings Script Properties)
  ROOT_FOLDER_NAME: "Pelatihan_Guru_PAI_2026",
  SHEETS: {
    PARTICIPANTS: "Participants",
    MATERIALS: "Materials",
    WORKSHEETS: "Worksheets",
    SUBMISSIONS: "Submissions"
  }
};

/**
 * Endpoint GET Handler
 * Contoh: ?action=bootstrap&email=user@gmail.com
 */
function doGet(e) {
  try {
    ensureSheetsInitialized();
    var action = e.parameter.action;
    var email = e.parameter.email;

    if (action === "bootstrap") {
      return handleBootstrap(email);
    } else if (action === "ping") {
      return responseJSON({ status: "success", message: "Backend Google Apps Script aktif dan siap." });
    }

    return responseJSON({ status: "error", message: "Aksi GET tidak dikenali." });
  } catch (err) {
    return responseJSON({ status: "error", message: err.toString() });
  }
}

/**
 * Endpoint POST Handler
 */
function doPost(e) {
  try {
    ensureSheetsInitialized();
    var request = JSON.parse(e.postData.contents);
    var action = request.action;

    // 1. Registrasi / Sinkronisasi Peserta
    if (action === "registerParticipant") {
      return handleRegisterParticipant(request.payload);
    } 
    
    // 2. Unggah Tugas / Lembar Kerja ke Google Drive & Sheets
    else if (action === "submitWorksheet") {
      return handleSubmitWorksheet(request.payload);
    } 
    
    // 3. Ambil Rekap Seluruh Pengumpulan untuk Fasilitator
    else if (action === "getAllSubmissions") {
      return handleGetAllSubmissions(request.adminKey);
    } 
    
    // 4. Input Nilai & Umpan Balik oleh Fasilitator
    else if (action === "gradeSubmission") {
      return handleGradeSubmission(request.adminKey, request.payload);
    } 
    
    // 5. Update Link Materi (PPT) dari Panel Admin
    else if (action === "updateMaterialLink") {
      return handleUpdateMaterialLink(request.adminKey, request.payload);
    } 
    
    // 6. Update Link Pretest / Lembar Kerja dari Panel Admin
    else if (action === "updateWorksheetLink") {
      return handleUpdateWorksheetLink(request.adminKey, request.payload);
    }

    return responseJSON({ status: "error", message: "Aksi POST tidak dikenali." });
  } catch (err) {
    return responseJSON({ status: "error", message: err.toString() });
  }
}

/**
 * Inisialisasi Otomatis Sheet & Header Kolom + Populate Data Awal
 */
function ensureSheetsInitialized() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Sheet Participants
  var partSheet = ss.getSheetByName(CONFIG.SHEETS.PARTICIPANTS);
  if (!partSheet) {
    partSheet = ss.insertSheet(CONFIG.SHEETS.PARTICIPANTS);
    partSheet.appendRow(["participant_id", "name", "email", "school", "registered_at", "last_active_at"]);
    formatHeader(partSheet, "#059669");
  }

  // 2. Sheet Materials (Bahan Tayang PPT)
  var matSheet = ss.getSheetByName(CONFIG.SHEETS.MATERIALS);
  if (!matSheet) {
    matSheet = ss.insertSheet(CONFIG.SHEETS.MATERIALS);
    matSheet.appendRow(["material_id", "day", "title", "description", "file_type", "file_size", "url", "order_index"]);
    formatHeader(matSheet, "#059669");
    populateInitialMaterials(matSheet);
  } else if (matSheet.getLastRow() < 2) {
    populateInitialMaterials(matSheet);
  }

  // 3. Sheet Worksheets (Pretest & Lembar Kerja)
  var wsSheet = ss.getSheetByName(CONFIG.SHEETS.WORKSHEETS);
  if (!wsSheet) {
    wsSheet = ss.insertSheet(CONFIG.SHEETS.WORKSHEETS);
    wsSheet.appendRow(["worksheet_id", "day", "title", "instructions", "template_url", "deadline"]);
    formatHeader(wsSheet, "#059669");
    populateInitialWorksheets(wsSheet);
  } else if (wsSheet.getLastRow() < 2) {
    populateInitialWorksheets(wsSheet);
  }

  // 4. Sheet Submissions (Pengumpulan Tugas)
  var subSheet = ss.getSheetByName(CONFIG.SHEETS.SUBMISSIONS);
  if (!subSheet) {
    subSheet = ss.insertSheet(CONFIG.SHEETS.SUBMISSIONS);
    subSheet.appendRow([
      "submission_id", "participant_email", "participant_name", "school", 
      "worksheet_id", "day", "drive_file_id", "drive_file_url", 
      "original_filename", "submitted_at", "status", "score", "feedback"
    ]);
    formatHeader(subSheet, "#059669");
  }
}

function populateInitialMaterials(sheet) {
  var initial = [
    ["MAT-H1-01", 1, "Orientasi Sertifikasi BNSP", "Slide pedoman teknis persyaratan asesmen uji kompetensi kerja skema BNSP.", "PPTX", "10.5 MB", "https://docs.google.com/presentation/d/placeholder-bnsp", 1],
    ["MAT-H1-02", 1, "Kebijakan Direktorat PAI Kementerian Agama RI", "Slide arah kebijakan penguatan kompetensi guru, moderasi beragama.", "PPTX", "14.2 MB", "https://docs.google.com/presentation/d/placeholder-kemenag", 2],
    ["MAT-H1-03", 1, "Perspektif Ekoteologi dalam Pendidikan Agama Islam", "Slide integrasi nilai kelestarian lingkungan berbasis ajaran Islam.", "PPTX", "9.8 MB", "https://docs.google.com/presentation/d/placeholder-ekoteologi", 3],
    ["MAT-H2-01", 2, "Kurikulum Berbasis Cinta melalui Pembelajaran Mendalam", "Slide pendekatan pedagogis holistik berbasis kasih sayang.", "PPTX", "11.5 MB", "https://docs.google.com/presentation/d/placeholder-kurikulum-cinta", 1],
    ["MAT-H2-02", 2, "Praktik Pedagogis STREAM", "Slide model integrasi kurikulum multidisiplin STREAM.", "PPTX", "16.4 MB", "https://docs.google.com/presentation/d/placeholder-stream", 2],
    ["MAT-H2-03", 2, "Pemanfaatan Koding & AI dalam Media Pembelajaran Digital", "Slide rekayasa prompt AI generatif dan koding untuk learners agency.", "PPTX", "18.1 MB", "https://docs.google.com/presentation/d/placeholder-ai-pembelajaran", 3],
    ["MAT-H2-04", 2, "Perencanaan Pembelajaran: Analisis Karakteristik Murid", "Slide diagnostik gaya belajar, minat, dan kesiapan murid.", "PPTX", "8.7 MB", "https://docs.google.com/presentation/d/placeholder-karakteristik-murid", 4],
    ["MAT-H2-05", 2, "Perencanaan Pembelajaran: Materi Esensial Rumpun PAI", "Slide bedah materi esensial Al-Qur'an & Hadis, Akidah, Akhlak, Fikih, SKI.", "PPTX", "22.3 MB", "https://docs.google.com/presentation/d/placeholder-materi-esensial", 5],
    ["MAT-H3-01", 3, "Analisis CP, TP, ATP dari Materi Esensial PAI", "Slide penurunan CP ke TP & Alur Tujuan Pembelajaran (ATP).", "PPTX", "15.6 MB", "https://docs.google.com/presentation/d/placeholder-cp-tp-atp", 1],
    ["MAT-H3-02", 3, "Asesmen Pembelajaran: Materi Esensial Rumpun PAI", "Slide panduan perancangan asesmen autentik HOTS.", "PPTX", "13.4 MB", "https://docs.google.com/presentation/d/placeholder-asesmen-pai", 2],
    ["MAT-H3-03", 3, "Berbagi Praktik Baik (Best Practice)", "Slide inspirasi implementasi strategi pengajaran inovatif.", "PPTX", "19.2 MB", "https://docs.google.com/presentation/d/placeholder-best-practice", 3],
    ["MAT-H4-01", 4, "Pedoman Teknis Pengumuman Sertifikasi & Penutupan", "Slide ketentuan pasca-ToT dan rekapitulasi nilai kompetensi.", "PPTX", "7.1 MB", "https://docs.google.com/presentation/d/placeholder-sertifikasi", 1]
  ];
  for (var i = 0; i < initial.length; i++) {
    sheet.appendRow(initial[i]);
  }
}

function populateInitialWorksheets(sheet) {
  var initial = [
    ["LK-H1-01", 1, "LK 1.1: Pretest dan Dinamika Kelompok", "Kerjakan asesmen awal instrumen pretest pemahaman kompetensi.", "https://exampro-7xj.pages.dev/", "Hari Ke-1 • 18.30 WIB"],
    ["LK-H1-02", 1, "LK 1.2: Matriks Desain Pembelajaran Berperspektif Ekoteologi", "Susun skenario integrasi pelestarian lingkungan berbasis ajaran Islam.", "https://docs.google.com/document/d/placeholder-template-ekoteologi", "Hari Ke-1 • 22.00 WIB"],
    ["LK-H2-01", 2, "LK 2.1: Praktik Pedagogis STREAM dalam Pembelajaran PAI", "Rancang sintaks dan lembar aktivitas belajar murid model STREAM.", "https://docs.google.com/document/d/placeholder-template-stream", "Hari Ke-2 • 12.30 WIB"],
    ["LK-H2-02", 2, "LK 2.2: Media Pembelajaran Digital Berbantuan Koding & AI", "Unggah dokumen prompt AI terstruktur atau prototipe media digital.", "https://docs.google.com/document/d/placeholder-template-ai", "Hari Ke-2 • 15.30 WIB"],
    ["LK-H2-03", 2, "LK 2.3: Analisis Profil & Karakteristik Belajar Murid", "Lakukan pemetaan kebutuhan belajar dan gaya belajar peserta didik.", "https://docs.google.com/document/d/placeholder-template-karakteristik", "Hari Ke-2 • 18.00 WIB"],
    ["LK-H3-01", 3, "LK 3.1: Matriks Penurunan CP - TP - ATP Materi Esensial PAI", "Turunkan CP ke dalam rumusan TP dan alur logis ATP kurikulum merdeka.", "https://docs.google.com/document/d/placeholder-template-cp-tp-atp", "Hari Ke-3 • 12.30 WIB"],
    ["LK-H3-02", 3, "LK 3.2: Perancangan Instrumen Asesmen Autentik PAI", "Susun rubrik asesmen, kisi-kisi soal penalaran kontekstual HOTS.", "https://docs.google.com/document/d/placeholder-template-asesmen", "Hari Ke-3 • 15.30 WIB"],
    ["LK-H3-03", 3, "LK 3.3: Post Test dan Refleksi Akhir Pelatihan", "Isi evaluasi post test pemahaman kompetensi dan refleksi mandiri.", "https://docs.google.com/document/d/placeholder-template-posttest", "Hari Ke-3 • 21.30 WIB"],
    ["LK-H4-01", 4, "LK 4.1: Rencana Pembelajaran (Modul Ajar) Microteaching", "Unggah Modul Ajar / RPP lengkap yang siap disimulasikan pada sesi praktik Microteaching.", "https://docs.google.com/document/d/placeholder-template-microteaching", "Hari Ke-4 • 08.00 WIB"]
  ];
  for (var i = 0; i < initial.length; i++) {
    sheet.appendRow(initial[i]);
  }
}

function formatHeader(sheet, bgColor) {
  var range = sheet.getRange(1, 1, 1, sheet.getLastColumn() || 1);
  range.setBackground(bgColor);
  range.setFontColor("#ffffff");
  range.setFontWeight("bold");
  sheet.setFrozenRows(1);
}

/**
 * Handle Bootstrap Data untuk Aplikasi Klien
 */
function handleBootstrap(email) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var matSheet = ss.getSheetByName(CONFIG.SHEETS.MATERIALS);
  var wsSheet = ss.getSheetByName(CONFIG.SHEETS.WORKSHEETS);
  var subSheet = ss.getSheetByName(CONFIG.SHEETS.SUBMISSIONS);

  var materials = getSheetDataAsObjects(matSheet);
  var worksheets = getSheetDataAsObjects(wsSheet);
  var userSubmissions = [];

  if (email && subSheet) {
    var allSub = getSheetDataAsObjects(subSheet);
    userSubmissions = allSub.filter(function(s) {
      return String(s.participant_email).trim().toLowerCase() === String(email).trim().toLowerCase();
    });
  }

  return responseJSON({
    status: "success",
    data: {
      materials: materials,
      worksheets: worksheets,
      userSubmissions: userSubmissions
    }
  });
}

/**
 * Handle Registrasi / Sinkronisasi Peserta Baru
 */
function handleRegisterParticipant(payload) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEETS.PARTICIPANTS);
  var email = String(payload.email || "").trim().toLowerCase();

  var data = getSheetDataAsObjects(sheet);
  var existingIndex = -1;
  for (var i = 0; i < data.length; i++) {
    if (String(data[i].email).trim().toLowerCase() === email) {
      existingIndex = i + 2;
      break;
    }
  }

  var now = new Date().toISOString();
  if (existingIndex > -1) {
    sheet.getRange(existingIndex, 2).setValue(payload.name);
    sheet.getRange(existingIndex, 4).setValue(payload.school);
    sheet.getRange(existingIndex, 6).setValue(now);
  } else {
    var pId = "P-" + Utilities.getUuid().substring(0, 8).toUpperCase();
    sheet.appendRow([pId, payload.name, payload.email, payload.school, now, now]);
  }

  return responseJSON({ status: "success" });
}

/**
 * Handle Unggah Tugas & Penyimpanan ke Folder Google Drive
 */
function handleSubmitWorksheet(payload) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var subSheet = ss.getSheetByName(CONFIG.SHEETS.SUBMISSIONS);

  // 1. Dapatkan atau Buat Folder Induk di Drive
  var rootFolderId = PropertiesService.getScriptProperties().getProperty("ROOT_FOLDER_ID");
  var rootFolder;
  if (rootFolderId) {
    rootFolder = DriveApp.getFolderById(rootFolderId);
  } else {
    var folders = DriveApp.getFoldersByName(CONFIG.ROOT_FOLDER_NAME);
    rootFolder = folders.hasNext() ? folders.next() : DriveApp.createFolder(CONFIG.ROOT_FOLDER_NAME);
  }

  // 2. Subfolder Hari (misal: "Hari_1", "Hari_2")
  var dayFolderName = "Hari_" + payload.day;
  var dayFolders = rootFolder.getFoldersByName(dayFolderName);
  var dayFolder = dayFolders.hasNext() ? dayFolders.next() : rootFolder.createFolder(dayFolderName);

  // 3. Subfolder Peserta (misal: "MAN_1_Jakarta_Dra_Siti")
  var safeSchool = (payload.school || "Sekolah").replace(/[^a-zA-Z0-9]/g, "_");
  var safeName = (payload.name || "Peserta").replace(/[^a-zA-Z0-9]/g, "_");
  var userFolderName = safeSchool + "_" + safeName;
  var userFolders = dayFolder.getFoldersByName(userFolderName);
  var targetFolder = userFolders.hasNext() ? userFolders.next() : dayFolder.createFolder(userFolderName);

  // 4. Decode File Base64 & Simpan ke Drive
  var decoded = Utilities.base64Decode(payload.base64File);
  var finalFileName = "[Hari-" + payload.day + "]_" + (payload.worksheetId || "LK") + "_" + payload.fileName;
  var blob = Utilities.newBlob(decoded, payload.mimeType || "application/octet-stream", finalFileName);
  var file = targetFolder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  var subId = "SUB-" + Utilities.getUuid().substring(0, 8).toUpperCase();
  var now = new Date().toISOString();

  // 5. Cek apakah re-submission (pernah kumpul sebelumnya)
  var allSub = getSheetDataAsObjects(subSheet);
  var rowIndex = -1;
  for (var i = 0; i < allSub.length; i++) {
    if (
      String(allSub[i].participant_email).trim().toLowerCase() === String(payload.email).trim().toLowerCase() &&
      String(allSub[i].worksheet_id) === String(payload.worksheetId)
    ) {
      rowIndex = i + 2;
      break;
    }
  }

  var submissionObj = {
    submission_id: subId,
    participant_email: payload.email,
    participant_name: payload.name,
    school: payload.school,
    worksheet_id: payload.worksheetId,
    day: payload.day,
    drive_file_id: file.getId(),
    drive_file_url: file.getUrl(),
    original_filename: payload.fileName,
    submitted_at: now,
    status: "submitted",
    score: null,
    feedback: null
  };

  if (rowIndex > -1) {
    subSheet.getRange(rowIndex, 7).setValue(file.getId());
    subSheet.getRange(rowIndex, 8).setValue(file.getUrl());
    subSheet.getRange(rowIndex, 9).setValue(payload.fileName);
    subSheet.getRange(rowIndex, 10).setValue(now);
    subSheet.getRange(rowIndex, 11).setValue("submitted");
  } else {
    subSheet.appendRow([
      submissionObj.submission_id,
      submissionObj.participant_email,
      submissionObj.participant_name,
      submissionObj.school,
      submissionObj.worksheet_id,
      submissionObj.day,
      submissionObj.drive_file_id,
      submissionObj.drive_file_url,
      submissionObj.original_filename,
      submissionObj.submitted_at,
      submissionObj.status,
      "",
      ""
    ]);
  }

  return responseJSON({ status: "success", data: submissionObj });
}

/**
 * Handle Rekap Seluruh Pengumpulan Peserta (Panel Admin)
 */
function handleGetAllSubmissions(adminKey) {
  if (!isAuthorizedAdmin(adminKey)) {
    return responseJSON({ status: "error", message: "Kunci otorisasi fasilitator tidak valid." });
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEETS.SUBMISSIONS);
  var submissions = getSheetDataAsObjects(sheet);

  return responseJSON({ status: "success", data: submissions });
}

/**
 * Handle Penilaian & Feedback Tugas
 */
function handleGradeSubmission(adminKey, payload) {
  if (!isAuthorizedAdmin(adminKey)) {
    return responseJSON({ status: "error", message: "Kunci otorisasi fasilitator tidak valid." });
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEETS.SUBMISSIONS);
  var data = getSheetDataAsObjects(sheet);

  for (var i = 0; i < data.length; i++) {
    if (data[i].submission_id === payload.submissionId) {
      var row = i + 2;
      sheet.getRange(row, 11).setValue("reviewed");
      sheet.getRange(row, 12).setValue(payload.score);
      sheet.getRange(row, 13).setValue(payload.feedback);
      return responseJSON({ status: "success" });
    }
  }

  return responseJSON({ status: "error", message: "ID submission tidak ditemukan." });
}

/**
 * Handle Update Tautan Bahan Tayang (PPT)
 */
function handleUpdateMaterialLink(adminKey, payload) {
  if (!isAuthorizedAdmin(adminKey)) {
    return responseJSON({ status: "error", message: "Kunci otorisasi fasilitator tidak valid." });
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEETS.MATERIALS);
  var data = getSheetDataAsObjects(sheet);

  for (var i = 0; i < data.length; i++) {
    if (data[i].material_id === payload.materialId) {
      var row = i + 2;
      sheet.getRange(row, 3).setValue(payload.title);
      sheet.getRange(row, 6).setValue(payload.file_size || "PPTX");
      sheet.getRange(row, 7).setValue(payload.url);
      return responseJSON({ status: "success" });
    }
  }

  return responseJSON({ status: "error", message: "Material ID tidak ditemukan." });
}

/**
 * Handle Update Tautan Pretest & Lembar Kerja
 */
function handleUpdateWorksheetLink(adminKey, payload) {
  if (!isAuthorizedAdmin(adminKey)) {
    return responseJSON({ status: "error", message: "Kunci otorisasi fasilitator tidak valid." });
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.SHEETS.WORKSHEETS);
  var data = getSheetDataAsObjects(sheet);

  for (var i = 0; i < data.length; i++) {
    if (data[i].worksheet_id === payload.worksheetId) {
      var row = i + 2;
      sheet.getRange(row, 3).setValue(payload.title);
      sheet.getRange(row, 5).setValue(payload.template_url);
      sheet.getRange(row, 6).setValue(payload.deadline || "");
      return responseJSON({ status: "success" });
    }
  }

  return responseJSON({ status: "error", message: "Worksheet ID tidak ditemukan." });
}

/**
 * Helper Validasi Kunci Rahasia Fasilitator
 */
function isAuthorizedAdmin(key) {
  var expectedKey = PropertiesService.getScriptProperties().getProperty("ADMIN_SECRET_KEY") || CONFIG.ADMIN_SECRET_KEY;
  return key === expectedKey;
}

/**
 * Helper Membaca Sheet Menjadi Array of Object
 */
function getSheetDataAsObjects(sheet) {
  if (!sheet) return [];
  var rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return [];
  var headers = rows[0];
  var result = [];

  for (var i = 1; i < rows.length; i++) {
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = rows[i][j];
    }
    result.push(obj);
  }
  return result;
}

/**
 * Helper Response JSON dengan CORS Support
 */
function responseJSON(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
