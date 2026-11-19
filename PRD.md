# 📋 PRD — Dashboard Pelatihan Guru (Training of Teacher)
### Versi: 1.2 (No-Login, Frictionless Access & Production-Ready Specs)
### Durasi Pelatihan: 3 Hari
### Status: Siap Implementasi

---

## 1. 📌 Ringkasan Produk

**Nama Produk:** TOT Dashboard (Teacher Training Dashboard)  
**Durasi Pelatihan:** 3 Hari  
**Model Akses:** **Tanpa Login Akun (Frictionless)** — Peserta cukup mengisi identitas singkat (nama, email, asal sekolah) satu kali yang disimpan di `localStorage` dan disinkronkan via Google Sheets. Fasilitator/Admin mengakses panel pengawasan dan penilaian via *Secret URL / Access Token*.

**Tujuan:**  
Menyediakan platform terpusat, ringan, dan elegan bagi guru/peserta pelatihan untuk:
1. Mengakses bahan tayang & materi harian (< 2 klik).
2. Mengunduh template lembar kerja.
3. Mengumpulkan lembar kerja secara digital tanpa hambatan registrasi/login akun.
4. Memantau progres penyelesaian tugas secara transparan.  
Sekaligus memberikan panel bagi fasilitator untuk memantau kehadiran tugas, rekap nilai, dan unduh data secara terpusat.

**Target Pengguna:**
- **Peserta (Guru):** Mengakses materi, mengerjakan, mengumpulkan lembar kerja, dan melihat status tugas.
- **Fasilitator/Admin:** Mengelola materi & lembar kerja, memantau pengumpulan realtime, memberi nilai/feedback, dan mengekspor rekap spreadsheet/CSV.

---

## 2. 🎯 Tujuan & Metrik Keberhasilan

| Tujuan | Metrik | Target |
|---|---|---|
| Distribusi Materi Terpusat | Akses materi per hari | 100% bahan tayang dapat diakses < 2 klik |
| Digitalisasi Pengumpulan LK | Partisipasi pengumpulan tugas | ≥ 95% peserta mengumpulkan via dashboard |
| Onboarding Cepat & Mudah | Waktu pengisian identitas pertama kali | < 30 detik |
| Pemulihan Sesi Mandiri | Retensi status peserta saat berganti device | 100% riwayat tugas pulih cukup dengan input email |
| Monitoring Fasilitator | Visibilitas progres kelas | Realtime sinkronisasi ke Google Sheets |
| Performa & Kenyamanan UI | Skor SUS & Page Load Time | SUS ≥ 85, Load time awal < 2 detik |

---

## 3. 👥 User Persona & Peran

### 3.1 Peserta (Guru) — No Login
- **Onboarding Pertama:** Masuk ke URL dashboard → Modal Identity Gate muncul (Nama Lengkap, Email Aktif, Asal Sekolah/Instansi). Data tersimpan di `localStorage` klien sekaligus dicatat ke sheet `Participants`.
- **Navigasi Hari:** Beralih antar tab agenda (Hari 1, Hari 2, Hari 3).
- **Akses Materi:** Melihat daftar slide/modul dan membukanya via link Google Drive atau preview inline.
- **Pengerjaan & Pengumpulan:** 
  - Mengunduh template lembar kerja (Word/PDF/Spreadsheet).
  - Mengunggah file hasil kerja (PDF/DOCX/XLSX, batas maksimal 15 MB).
  - Mengisi refleksi singkat / catatan tambahan (opsional).
- **Status & Progres:** Melihat status tugas (*Belum Dikumpulkan*, *Terkumpul*, *Dinilai/Revisi*), progres bar keseluruhan (misal 5/6 LK selesai), dan riwayat tugas.
- **Manajemen Sesi:** Dapat menggunakan tombol "Ganti Identitas" atau "Pulihkan Sesi" (masukkan email lama untuk menarik kembali progres jika cache terhapus).
- **Re-submission:** Diizinkan mengunggah revisi selama lembar kerja belum berstatus *Dinilai (Final)* atau batas waktu belum lewat.

### 3.2 Fasilitator/Admin — Secret Access
- **Autentikasi Aman:** Mengakses `/admin?key=...` atau form input Secret Key di `/admin`. Kunci divalidasi ke backend Apps Script (bukan hardcoded di bundle client) dan token sesi disimpan di `sessionStorage`.
- **Manajemen Materi & LK (CRUD):** Tambah, edit link Drive, ubah deskripsi materi atau lembar kerja per hari.
- **Monitoring Pengumpulan Realtime:** Matriks status peserta vs lembar kerja per hari (indikator warna: Merah = Belum, Kuning = Terkumpul, Hijau = Dinilai).
- **Penilaian & Feedback:** Input skor (0-100) dan catatan revisi/feedback singkat yang langsung dapat dilihat peserta.
- **Ekspor Data:** Download rekap pengumpulan dalam format CSV/Excel atau buka sheet master langsung.

---

## 4. 🗺️ Fitur Utama & Prioritas (MoSCoW)

### 4.1 Must Have (P0)
1. **Identity Gate & Sesi Klien:**
   - Modal wajib isi nama, email, asal sekolah pada kunjungan pertama.
   - Fitur "Pulihkan Identitas" via email jika berpindah browser/perangkat atau cache hilang.
2. **Navigasi Tab 3 Hari:**
   - Stepper/tab interaktif Hari 1, 2, 3 dengan animasi indikator aktif (Framer Motion).
3. **Katalog Bahan Tayang:**
   - Kartu materi per hari dengan metadata: Judul, deskripsi singkat, format file icon, dan tombol *Buka / Unduh*.
4. **Modul Pengumpulan Lembar Kerja:**
   - Kartu LK per hari dengan template download.
   - Form modal upload file: drag-and-drop, validasi format (`.pdf`, `.docx`, `.xlsx`, `.pptx`, `.zip`), validasi ukuran (< 15 MB).
   - Pengiriman file via base64 ke Google Apps Script → otomatis tersimpan di Google Drive folder TOT terorganisir per Hari/Peserta.
   - Penamaan file otomatis: `[Hari-X]_[NamaSekolah]_[NamaPeserta]_[NamaLK].[ext]`.
5. **Indikator Progres Peserta:**
   - Widget progress bar (persentase & pecahan LK selesai).
   - Status badge realtime per LK: `Belum Terkumpul` (Abu-abu), `Terkumpul` (Biru), `Perlu Revisi` (Kuning), `Selesai Dinilai` (Hijau).
6. **Admin Panel Terproteksi:**
   - URL `/admin` dengan verifikasi admin key ke backend.
   - Dashboard matriks rekap peserta & tugas.
   - Form penilaian cepat (Skor + Feedback) per submission.
   - Ekspor rekap nilai & kehadiran tugas ke CSV.

### 4.2 Should Have (P1)
- **Notifikasi Toast:** Umpan balik visual saat upload berhasil, gagal, validasi file tidak sesuai, atau identitas diperbarui.
- **Fitur Ganti Identitas:** Menu dropdown di navbar untuk melihat profil aktif dan opsi switch identitas.
- **Re-submission (Upload Revisi):** Tombol unggah ulang file sebelum dinilai fasilitator.
- **Filter & Pencarian Admin:** Filter tabel peserta berdasarkan nama, sekolah, atau status kelengkapan tugas.
- **Offline / Network Fault Tolerance:** Feedback informatif jika Google Apps Script mengalami antrean request / timeout.

### 4.3 Could Have (P2)
- Preview dokumen PDF langsung di dalam modal (PDF inline viewer).
- Dark Mode toggle (Slate & Emerald).
- Countdown timer batas pengumpulan tiap lembar kerja.
- Notifikasi email otomatis via Apps Script ke peserta saat nilai/feedback diberikan fasilitator.

### 4.4 Won't Have (v1)
- Registrasi akun dengan password / OAuth (Google Login ditiadakan demi frictionless access).
- Fitur live streaming / video conference terintegrasi.
- Forum chat realtime antar peserta.
- Generator sertifikat otomatis (akan diproses terpisah via rekap admin).

---

## 5. 🧱 Arsitektur Sistem & Spesifikasi Teknis

### 5.1 Technology Stack

| Layer | Teknologi | Peran & Alasan |
|---|---|---|
| **Frontend Framework** | **React 18 + Vite** | SPA cepat, performa render tinggi, build bundle ringkas |
| **Styling** | **Tailwind CSS v3** | Styling utility-first, palet custom Emerald & Slate, mobile-responsive |
| **Animation** | **Framer Motion** | Micro-interactions halus (tab layoutId, modal dialog, status badge) |
| **Icons** | **Lucide React** | Ikon modern, konsisten, dan ringan |
| **Routing** | **React Router v6** | Client-side routing (`/`, `/admin`) |
| **State Management** | **React Context + Hooks** | `ParticipantContext` (identitas & tugas) + `AdminContext` |
| **Backend & Storage** | **Google Apps Script (Web App)** | RESTful webhook handler tanpa biaya server |
| **Database** | **Google Sheets** | Database relasional sederhana, transparan & mudah diakses panitia |
| **File Storage** | **Google Drive API (Apps Script)** | Penyimpanan file tugas peserta terstruktur dalam folder |
| **Persistence Klien** | `localStorage` & `sessionStorage` | Cache identitas lokal & token sesi admin |

---

### 5.2 Skema Data Google Sheets

Spreadsheet master bertindak sebagai database dengan 4 sheet:

#### Sheet 1: `Participants`
Menyimpan master data peserta pelatihan.
| Kolom | Tipe | Keterangan |
|---|---|---|
| `participant_id` | String | Format: `P-YYYYMMDD-XXXX` (Unique key) |
| `name` | String | Nama lengkap & gelar |
| `email` | String | Email aktif (kunci pencarian/pemulihan sesi) |
| `school` | String | Asal sekolah / instansi |
| `registered_at` | ISO DateTime | Waktu pertama kali mengisi identitas |
| `last_active_at` | ISO DateTime | Timestamp aktivitas terakhir |

#### Sheet 2: `Materials`
Menyimpan daftar bahan tayang/slide per hari.
| Kolom | Tipe | Keterangan |
|---|---|---|
| `material_id` | String | ID unik (contoh: `MAT-H1-01`) |
| `day` | Integer | `1`, `2`, atau `3` |
| `title` | String | Judul materi |
| `description` | String | Ringkasan materi |
| `file_type` | String | `PDF`, `PPTX`, `CANVA`, `LINK` |
| `file_size` | String | Contoh: `"3.2 MB"` |
| `url` | String | Link Google Drive / slide web |
| `order_index` | Integer | Urutan tampil di kartu |

#### Sheet 3: `Worksheets`
Menyimpan daftar lembar kerja/tugas per hari.
| Kolom | Tipe | Keterangan |
|---|---|---|
| `worksheet_id` | String | ID unik (contoh: `LK-H1-01`) |
| `day` | Integer | `1`, `2`, atau `3` |
| `title` | String | Nama lembar kerja |
| `instructions` | String | Petunjuk pengerjaan |
| `template_url` | String | Link unduh template kosong |
| `deadline` | ISO DateTime | Batas akhir pengumpulan (opsional) |

#### Sheet 4: `Submissions`
Menyimpan seluruh pengumpulan tugas dari peserta.
| Kolom | Tipe | Keterangan |
|---|---|---|
| `submission_id` | String | ID unik (contoh: `SUB-XXXXXX`) |
| `participant_email` | String | Relasi ke `Participants.email` |
| `participant_name` | String | Nama peserta (denormalized untuk rekap cepat) |
| `school` | String | Asal sekolah |
| `worksheet_id` | String | Relasi ke `Worksheets.worksheet_id` |
| `day` | Integer | Hari pelaksanaan tugas (`1`, `2`, `3`) |
| `drive_file_id` | String | ID file di Google Drive |
| `drive_file_url` | String | Link akses file hasil kerja di Drive |
| `original_filename` | String | Nama asli file yang diunggah |
| `submitted_at` | ISO DateTime | Waktu pengumpulan |
| `status` | String | `submitted`, `reviewed`, `revision_needed` |
| `score` | Number / Empty | Nilai dari fasilitator (0 - 100) |
| `feedback` | String / Empty | Catatan evaluasi dari fasilitator |

---

### 5.3 Spesifikasi API Google Apps Script (Web App)

Apps Script menerima request `GET` dan `POST` via URL: `https://script.google.com/macros/s/{DEPLOYMENT_ID}/exec`.

#### 1. `GET ?action=bootstrap&email={optional}`
* Mengambil data inisial: Daftar `Materials`, `Worksheets`, dan jika parameter `email` disertakan, mengambil riwayat `Submissions` peserta terkait.
* **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "materials": [ ... ],
      "worksheets": [ ... ],
      "userSubmissions": [ ... ]
    }
  }
  ```

#### 2. `POST` Register / Sync Participant
* **Body:**
  ```json
  {
    "action": "registerParticipant",
    "payload": {
      "name": "Budi Santoso, M.Pd.",
      "email": "budi@sekolah.sch.id",
      "school": "SMA Negeri 1 Jakarta"
    }
  }
  ```

#### 3. `POST` Upload Submission
* Menerima payload base64 file tugas dan metadata.
* **Body:**
  ```json
  {
    "action": "submitWorksheet",
    "payload": {
      "email": "budi@sekolah.sch.id",
      "name": "Budi Santoso, M.Pd.",
      "school": "SMA Negeri 1 Jakarta",
      "worksheetId": "LK-H1-01",
      "day": 1,
      "fileName": "Tugas_Refleksi.pdf",
      "mimeType": "application/pdf",
      "base64File": "JVBERi0xLjQKJ..."
    }
  }
  ```
* **Logika Backend:**
  - Membuat / menempatkan file ke folder Google Drive: `TOT_Submissions/Hari_{day}/{School}_{Name}/`.
  - Mengupdate atau menambahkan baris baru di sheet `Submissions`.
  - Mengembalikan `drive_file_url` dan status terbaru.

#### 4. `POST` Admin Actions (`validateKey`, `getAllSubmissions`, `gradeSubmission`)
* Membutuhkan parameter `adminKey` di header / payload.
* Admin Key dicocokkan dengan `ScriptProperties.getProperty("ADMIN_SECRET_KEY")` di Apps Script (aman, tidak terbaca di client-side bundle).

---

### 5.4 Struktur Direktori Proyek (Frontend)

```text
dashboard_tot/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── public/
│   ├── favicon.ico
│   └── assets/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── api/
    │   ├── appsScriptClient.js    # Abstraksi fetch & error handling ke Apps Script
    │   └── endpoints.js           # Konstanta endpoint & fungsi helper
    ├── context/
    │   ├── ParticipantContext.jsx  # Identitas lokal, status sinkronisasi, riwayat tugas
    │   └── AdminContext.jsx        # Status auth admin, data rekap submission
    ├── components/
    │   ├── common/
    │   │   ├── Navbar.jsx          # Brand, Hari switcher, profil peserta / ganti identitas
    │   │   ├── Toast.jsx           # Notifikasi animasi Framer Motion
    │   │   ├── Badge.jsx           # Status badge (Terkumpul, Belum, dsb)
    │   │   ├── Modal.jsx           # Accessible dialog backdrop & wrapper
    │   │   └── ProgressBar.jsx     # Visualisasi penyelesaian LK
    │   ├── participant/
    │   │   ├── IdentityModal.jsx   # Form onboarding nama/email/sekolah & pulihkan sesi
    │   │   ├── DayTabs.jsx         # Navigasi Hari 1, 2, 3 dengan layoutId animation
    │   │   ├── MaterialCard.jsx    # Card bahan tayang & preview button
    │   │   ├── WorksheetCard.jsx   # Card tugas, template download & status pengumpulan
    │   │   └── UploadModal.jsx     # Drag-and-drop file upload & progress feedback
    │   └── admin/
    │       ├── AdminAuthGate.jsx   # Form input / verifikasi secret token admin
    │       ├── SubmissionTable.jsx # Tabel interaktif peserta & matriks tugas
    │       ├── GradeModal.jsx      # Form input nilai & feedback
    │       └── StatsOverview.jsx   # Ringkasan KPI (jumlah peserta, % selesai)
    ├── pages/
    │   ├── ParticipantDashboard.jsx # Halaman utama guru
    │   ├── AdminDashboard.jsx       # Panel kontrol fasilitator
    │   └── NotFound.jsx
    ├── hooks/
    │   ├── useLocalStorage.js      # Sync data ke local storage
    │   └── useSubmissions.js       # Hook filter & status agregasi tugas
    └── utils/
        ├── fileHelpers.js          # File size formatter, base64 converter, validator
        └── dateHelpers.js          # Formatting waktu Indonesia (WIB/WITA/WIT)
```

---

## 6. 🛡️ Penanganan Resiko & Mitigasi Teknis

| Resiko | Probabilitas | Dampak | Mitigasi Solusi |
|---|---|---|---|
| **Cache/Browser Peserta Terhapus** | Sedang | Tinggi | Sediakan tombol **"Pulihkan Sesi"** di Navbar: Peserta cukup memasukkan email terdaftar untuk menarik kembali data riwayat tugas dari backend. |
| **Payload Upload Terlalu Besar (Apps Script Timeout)** | Sedang | Sedang | Validasi ketat di frontend maksimal **15 MB**. Jika format bukan PDF/Dokumen, tolak di sisi browser sebelum encode base64. Tampilkan progress indikator. |
| **Konkurensi Apps Script Sibuk** | Sedang | Sedang | Buat mekanisme *automatic retry with exponential backoff* (maksimal 3x) pada client API helper, serta tampilkan pesan loading yang ramah. |
| **Kebocoran Admin Key di URL** | Rendah | Tinggi | `/admin` mendukung input manual key via modal yang disimpan di `sessionStorage`, dan jika key dikirim via query `?key=...`, URL langsung di-sanitize (`history.replaceState`) agar key tidak tersimpan di riwayat browser. Verifikasi key dievaluasi di Apps Script backend. |
| **Peserta Salah Kirim File** | Tinggi | Rendah | Izinkan fitur **Unggah Ulang (Re-submission)** yang otomatis menggantikan tautan file lama sebelum fasilitator menyelesaikan penilaian. |

---

## 7. 🎨 Panduan Desain & UX (Look & Feel)

- **Tema Warna:** Modern Professional Education
  - *Primary (Emerald):* `emerald-600` (Aksen utama), `emerald-500` (Hover), `emerald-50` (Aksen lembut latar).
  - *Neutral (Slate):* `slate-900` (Heading/Text), `slate-600` (Body), `slate-100` (Card border/divider).
  - *Status Colors:* Hijau (Tuntas/Dinilai), Amber/Kuning (Proses/Perlu Revisi), Biru (Terkumpul), Abu-abu (Belum).
- **Tipografi:** Sans-serif modern dan bersih (`Inter` atau `Plus Jakarta Sans`).
- **Mikro-Animasi:**
  - Tab Hari menggunakan Framer Motion `layoutId="activeDayTab"`.
  - Modal fade-in + scale-up (`initial={{ opacity: 0, scale: 0.95 }}`).
  - Toast notifikasi slide-down dari sudut kanan atas.
- **Responsivitas:** Wajib 100% responsif pada layar smartphone (guru kerap membuka via HP/tablet saat workshop).

---

## 8. 🚀 Rencana Fase Implementasi

1. **Fase 1: Setup Proyek & UI Shell (Frontend Foundation)**
   - Inisialisasi Vite + React + Tailwind + Lucide Icons + Framer Motion.
   - Implementasi layout, Navbar, tab Hari 1-3, dan kartu mockup materi/lembar kerja.
2. **Fase 2: Identity Gate & Participant Context**
   - Implementasi `IdentityModal` (nama, email, sekolah) + sinkronisasi `localStorage`.
   - Implementasi fitur "Ganti Identitas" dan "Pulihkan Sesi".
3. **Fase 3: Google Apps Script Backend & Drive Integration**
   - Pembuatan skrip `Code.gs` untuk manajemen 4 sheet dan upload file base64 ke Google Drive.
   - Konfigurasi permission Drive folder & Deployment Web App.
4. **Fase 4: Upload Flow & Status Realtime**
   - Integrasi `UploadModal` (drag & drop, convert base64, status loading/retry).
   - Realtime update status tugas di kartu lembar kerja dan progress bar.
5. **Fase 5: Admin Panel & Grading**
   - Pembuatan route `/admin`, proteksi token, tabel matriks pengumpulan, modal penilaian, dan ekspor CSV.
6. **Fase 6: Testing & Polish**
   - Uji batas ukuran file, uji konkurensi simulasi, uji responsiveness mobile, dan finalisasi dokumentasi panduan deploy Apps Script.
