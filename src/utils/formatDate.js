export const formatTanggalIndonesia = (date) => {
  if (!date) return '-';

    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(`${date}T00:00:00`));
};