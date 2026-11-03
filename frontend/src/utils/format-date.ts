export function formatDate(dateString: string): string {
  try {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('tr-TR', options);
  } catch {
    return dateString;
  }
}
