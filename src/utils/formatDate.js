export function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);

  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    
  });
}