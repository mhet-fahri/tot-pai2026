# 🚀 TOT Dashboard (Training of Teacher)

Aplikasi Web Dashboard Pelatihan Guru 3 Hari dengan akses langsung tanpa login akun (*frictionless*), integrasi pengumpulan tugas digital ke Google Drive dan Google Sheets, serta panel evaluasi untuk fasilitator.

---

## 🛠️ Tech Stack
- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS v3 (Tema Slate & Emerald)
- **Animasi:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router DOM v6
- **Backend / Database:** Google Apps Script Web App + Google Sheets + Google Drive

---

## 🚀 Menjalankan Secara Lokal

1. **Clone & Install Dependencies:**
   ```bash
   npm install
   ```

2. **Jalankan Development Server:**
   ```bash
   npm run dev
   ```
   Buka browser di `http://localhost:3000`.

3. **Build untuk Produksi:**
   ```bash
   npm run build
   ```

---

## 🔑 Akses Panel Fasilitator (Admin)

1. Buka URL: `http://localhost:3000/admin`
2. Masukkan Secret Key default: `tot-admin-2026` (atau melalui query parameter: `http://localhost:3000/admin?key=tot-admin-2026`)
3. Di panel ini fasilitator dapat:
   - Melihat daftar seluruh tugas peserta per hari.
   - Mengunduh file tugas langsung dari Google Drive.
   - Memberikan skor (0-100) dan umpan balik / catatan evaluasi.
   - Mengekspor data rekap ke format CSV.

---

## ☁️ Integrasi Google Apps Script & Google Drive

Kode backend sudah disediakan lengkap di folder `google-apps-script/Code.gs`.

### Langkah Setup Google Sheets & Apps Script:
1. Buat Google Spreadsheet baru dengan 4 sheet:
   - `Participants`
   - `Materials`
   - `Worksheets`
   - `Submissions`
2. Buka menu **Extensions > Apps Script** di spreadsheet tersebut.
3. Salin seluruh isi file `google-apps-script/Code.gs` ke editor Apps Script.
4. Buka **Project Settings > Script Properties**, tambahkan:
   - `ADMIN_SECRET_KEY`: *kata kunci rahasia fasilitator*
   - `ROOT_FOLDER_ID`: *ID Folder Google Drive tempat menyimpan berkas lembar kerja*
5. Klik **Deploy > New deployment**:
   - Pilih jenis: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Salin Deployment URL Web App yang dihasilkan, lalu masukkan ke file `.env` di proyek ini:
   ```env
   VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
   ```
