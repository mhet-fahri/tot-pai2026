# 📘 Panduan Setup Google Apps Script (Backend Resmi)
### Pelatihan Guru PAI
**Penyelenggara:**  
Direktorat PAI Kementerian Agama Republik Indonesia & Fakultas Ilmu Tarbiyah dan Keguruan UIN Syarif Hidayatullah Jakarta

---

## 📌 Arsitektur & Keunggulan Backend Ini
1. **Zero Maintenance Server:** Berjalan 100% di infrastruktur Google Cloud gratis (Google Apps Script).
2. **Auto-Setup Spreadsheet:** Saat pertama kali dijalankan, skrip otomatis membuat dan memformat 4 sheet utama lengkap dengan header warna hijau Kemenag tanpa perlu Anda ketik manual satu per satu.
3. **Penyimpanan Terstruktur Google Drive:** File berkas tugas yang diunggah peserta otomatis tersimpan rapi per subfolder:
   `Pelatihan_Guru_PAI_2026 / Hari_{X} / {Asal_Sekolah}_{Nama_Peserta} / ...`
4. **Keamanan Fasilitator:** Aksi admin (melihat seluruh nilai, memberi skor/feedback, serta mengubah link PPT dan link Pretest) diproteksi oleh kunci rahasia (*Secret Key*).

---

## 🛠️ Langkah Demi Langkah Setup (Hanya 3 Menit)

### Langkah 1: Buat Spreadsheet Baru
1. Buka [Google Sheets](https://sheets.new) di browser Anda.
2. Beri nama spreadsheet, contoh: `Database Pelatihan Guru PAI 2026`.

### Langkah 2: Salin Kode Google Script
1. Di Google Sheets tersebut, klik menu **Ekstensi (Extensions) > Apps Script**.
2. Hapus seluruh isi default editor `myFunction()`.
3. Buka file [google-apps-script/Code.gs](file:///Users/fahri/Documents/dashboard_tot/google-apps-script/Code.gs) di proyek ini, **salin seluruh isinya**, dan tempelkan ke editor Apps Script.
4. Klik tombol **Simpan (Save)** (ikon disket atau `Ctrl+S` / `Cmd+S`).

### Langkah 3: Deploy sebagai Web App
1. Di pojok kanan atas Apps Script, klik tombol biru **Terapkan (Deploy) > Deployment baru (New deployment)**.
2. Klik ikon gerigi ⚙️ di sebelah *Pilih jenis (Select type)*, pilih **Aplikasi web (Web app)**.
3. Isi setelan berikut:
   - **Deskripsi:** `Backend Pelatihan Guru PAI v1.0`
   - **Jalankan sebagai (Execute as):** `Saya (email Anda)`
   - **Yang memiliki akses (Who has access):** `Siapa saja (Anyone)` *(Wajib dipilih agar peserta bisa mengumpulkan tugas tanpa login akun Google)*.
4. Klik **Terapkan (Deploy)**.
5. Klik **Beri Akses (Authorize Access)**, pilih akun Google Anda, klik *Lanjutan (Advanced) > Buka Proyek (tidak aman)*, lalu klik **Izinkan (Allow)**.
6. **Salin URL Aplikasi Web** yang muncul (contoh format: `https://script.google.com/macros/s/AKfycb.../exec`).

### Langkah 4: Hubungkan ke Dashboard Anda
1. Buka file `.env` di proyek ini.
2. Tempelkan URL yang sudah Anda salin tadi:
   ```env
   VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
   VITE_ADMIN_SECRET_KEY=tot-admin-2026
   ```
3. Simpan file `.env`. Dashboard sekarang resmi terhubung secara *live* ke Google Spreadsheet & Google Drive Anda!

---

## 📊 Struktur 4 Sheet Database Otomatis

### 1. `Participants` (Master Data Peserta)
| Kolom | Keterangan |
|---|---|
| `participant_id` | ID unik peserta (misal: `P-8B7C1D2E`) |
| `name` | Nama lengkap & gelar guru |
| `email` | Alamat email aktif |
| `school` | Asal sekolah / madrasah |
| `registered_at` | Waktu pertama kali mengisi form |
| `last_active_at` | Waktu aktivitas terakhir |

### 2. `Materials` (Katalog Bahan Tayang PPT)
| Kolom | Keterangan |
|---|---|
| `material_id` | ID materi (misal: `MAT-H1-01`) |
| `day` | Hari ke- (1 sampai 5) |
| `title` | Judul materi presentasi |
| `description` | Ringkasan materi |
| `file_type` | `PPTX` |
| `file_size` | Estimasi ukuran file (misal: `14.2 MB`) |
| `url` | Link Google Drive PPT Anda |
| `order_index` | Urutan tampil |

### 3. `Worksheets` (Katalog Pretest & Lembar Kerja)
| Kolom | Keterangan |
|---|---|
| `worksheet_id` | ID LK (misal: `LK-H1-01`) |
| `day` | Hari ke- (1 sampai 5) |
| `title` | Nama tugas / pretest |
| `instructions` | Petunjuk pengerjaan |
| `template_url` | Link Google Form Pretest atau link template Docs |
| `deadline` | Batas waktu sesi (misal: `Hari Ke-1 • 17.30 WIB`) |

### 4. `Submissions` (Rekap Pengumpulan Berkas Portofolio)
| Kolom | Keterangan |
|---|---|
| `submission_id` | ID unik pengumpulan |
| `participant_email` | Email peserta |
| `participant_name` | Nama peserta |
| `school` | Asal sekolah |
| `worksheet_id` | ID lembar kerja yang dikerjakan |
| `day` | Hari pelaksanaan |
| `drive_file_id` | ID file di Google Drive panitia |
| `drive_file_url` | Tautan langsung membuka file hasil kerja |
| `original_filename` | Nama asli berkas yang diunggah |
| `submitted_at` | Waktu pengumpulan (ISO timestamp) |
| `status` | `submitted` atau `reviewed` |
| `score` | Nilai skor (0-100) dari fasilitator |
| `feedback` | Catatan evaluasi / koreksi dari fasilitator |

---

## 🔒 Mengganti Kunci Rahasia Admin (Opsional)
Jika Anda ingin mengubah password admin dari default `tot-admin-2026`:
1. Di editor Google Apps Script, buka menu **Setelan Proyek ⚙️ (Project Settings)** di bilah kiri.
2. Gulir ke bawah ke bagian **Properti Skrip (Script Properties)**.
3. Klik **Tambahkan properti skrip**:
   - Properti: `ADMIN_SECRET_KEY`
   - Nilai: *kata kunci baru Anda*
4. Simpan, dan ubah juga nilai `VITE_ADMIN_SECRET_KEY` di file `.env` dashboard Anda.
