// Format ISO string ke format tanggal waktu Indonesia
export const formatIndonesianDate = (isoString) => {
  if (!isoString) return '-';
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date) + ' WIB';
  } catch {
    return isoString;
  }
};
