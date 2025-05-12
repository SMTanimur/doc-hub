export async function convertTxtToHtml(buffer: Buffer): Promise<string> {
  const text = buffer.toString('utf-8');
  // Simple conversion: wrap each line in a paragraph tag.
  // For more sophisticated TXT styling, you might consider options or analyzing structure.
  const paragraphs = text
    .split(/\r?\n/)
    .map(line => `<p>${line.trim() === '' ? '<br>' : escapeHtml(line)}</p>`)
    .join('\n');
  return `<div data-format="txt">${paragraphs}</div>`;
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
