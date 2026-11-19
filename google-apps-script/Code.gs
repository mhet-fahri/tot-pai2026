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
 * Inisialisasi Otomatis Sheet & Header Kolom
 * Memastikan tabel langsung siap pakai tanpa perlu buat kolom manual satu per satu.
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
  }

  // 3. Sheet Worksheets (Pretest & Lembar Kerja)
  var wsSheet = ss.getSheetByName(CONFIG.SHEETS.WORKSHEETS);
  if (!wsSheet) {
    wsSheet = ss.insertSheet(CONFIG.SHEETS.WORKSHEETS);
    wsSheet.appendRow(["worksheet_id", "day", "title", "instructions", "template_url", "deadline"]);
    formatHeader(wsSheet, "#059669");
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
