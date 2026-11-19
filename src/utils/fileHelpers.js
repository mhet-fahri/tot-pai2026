// Helper untuk konversi File object ke Base64 string
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Hilangkan data URL prefix (contoh: 'data:application/pdf;base64,')
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

// Validasi ukuran dan ekstensi file
export const validateFile = (file, maxMb = 15) => {
  const allowedExtensions = ['pdf', 'docx', 'xlsx', 'pptx', 'zip'];
  const ext = file.name.split('.').pop().toLowerCase();

  if (!allowedExtensions.includes(ext)) {
    return {
      isValid: false,
      error: `Format .${ext} tidak didukung. Harap unggah format PDF, DOCX, XLSX, PPTX, atau ZIP.`
    };
  }

  const fileSizeMb = file.size / (1024 * 1024);
  if (fileSizeMb > maxMb) {
    return {
      isValid: false,
      error: `Ukuran file (${fileSizeMb.toFixed(1)} MB) melebihi batas maksimal ${maxMb} MB.`
    };
  }

  return { isValid: true, error: null };
};

// Format byte ke format yang mudah dibaca
export const formatBytes = (bytes, decimals = 1) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
