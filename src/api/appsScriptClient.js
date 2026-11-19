import { INITIAL_MATERIALS, INITIAL_WORKSHEETS } from '../data/mockData';

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || '';

/**
 * Fetch helper dengan automatic retry dan timeout
 */
async function fetchWithRetry(url, options = {}, retries = 2, backoff = 1000) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
    return await res.json();
  } catch (err) {
    if (retries > 0) {
      await new Promise(r => setTimeout(r, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 1.5);
    }
    throw err;
  }
}

export const api = {
  /**
   * Mengambil data bootstrap (Materials, Worksheets, User Submissions)
   */
  async getBootstrapData(email = '') {
    if (!APPS_SCRIPT_URL) {
      console.warn('Apps Script URL belum diatur, menggunakan data lokal fallback.');
      return {
        status: 'success',
        data: {
          materials: INITIAL_MATERIALS,
          worksheets: INITIAL_WORKSHEETS,
          userSubmissions: []
        }
      };
    }

    try {
      const url = `${APPS_SCRIPT_URL}?action=bootstrap${email ? `&email=${encodeURIComponent(email)}` : ''}`;
      const response = await fetchWithRetry(url);
      return response;
    } catch (err) {
      console.error('Gagal mengambil data dari Google Apps Script:', err);
      return {
        status: 'fallback',
        data: {
          materials: INITIAL_MATERIALS,
          worksheets: INITIAL_WORKSHEETS,
          userSubmissions: []
        }
      };
    }
  },

  /**
   * Registrasi / Sinkronisasi Peserta Baru
   */
  async registerParticipant(participant) {
    if (!APPS_SCRIPT_URL) {
      return { status: 'success', message: 'Simulated local register' };
    }

    return fetchWithRetry(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'registerParticipant',
        payload: participant
      })
    });
  },

  /**
   * Upload Lembar Kerja ke Apps Script & Google Drive
   */
  async submitWorksheet(payload) {
    if (!APPS_SCRIPT_URL) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        status: 'success',
        data: {
          submission_id: 'SUB-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          worksheet_id: payload.worksheetId,
          day: payload.day,
          participant_email: payload.email,
          participant_name: payload.name,
          school: payload.school,
          original_filename: payload.fileName,
          drive_file_url: 'https://drive.google.com/file/d/mock-file-id/view',
          submitted_at: new Date().toISOString(),
          status: 'submitted',
          score: null,
          feedback: null
        }
      };
    }

    return fetchWithRetry(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'submitWorksheet',
        payload: payload
      })
    });
  },

  /**
   * Validasi Admin Secret Key & Ambil Rekap Seluruh Pengumpulan
   */
  async getAdminSubmissions(adminKey) {
    if (!APPS_SCRIPT_URL) {
      return {
        status: 'success',
        data: []
      };
    }

    return fetchWithRetry(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'getAllSubmissions',
        adminKey: adminKey
      })
    });
  },

  /**
   * Beri Nilai dan Umpan Balik oleh Admin
   */
  async gradeSubmission(adminKey, submissionId, score, feedback) {
    if (!APPS_SCRIPT_URL) {
      return { status: 'success' };
    }

    return fetchWithRetry(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'gradeSubmission',
        adminKey: adminKey,
        payload: { submissionId, score, feedback }
      })
    });
  },

  /**
   * Simpan Perubahan Tautan Materi PPT ke Google Spreadsheet
   */
  async updateMaterialLink(adminKey, materialId, data) {
    if (!APPS_SCRIPT_URL) {
      return { status: 'success' };
    }

    return fetchWithRetry(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'updateMaterialLink',
        adminKey: adminKey,
        payload: { materialId, ...data }
      })
    });
  },

  /**
   * Simpan Perubahan Tautan Pretest / Lembar Kerja ke Google Spreadsheet
   */
  async updateWorksheetLink(adminKey, worksheetId, data) {
    if (!APPS_SCRIPT_URL) {
      return { status: 'success' };
    }

    return fetchWithRetry(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        action: 'updateWorksheetLink',
        adminKey: adminKey,
        payload: { worksheetId, ...data }
      })
    });
  }
};
