export function generateId() {
  return '_' + Math.random().toString(36).slice(2, 9);
}

export function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function downloadFile(filename, data, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([data], { type }));
  a.download = filename;
  a.click();
}
