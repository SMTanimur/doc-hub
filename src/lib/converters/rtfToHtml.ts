// Note: Converting RTF to high-fidelity HTML with preserved styles
// is best handled by tools like LibreOffice (via Gotenberg or direct command line)
// or commercial SDKs.

export async function convertRtfToHtml(buffer: Buffer): Promise<string> {
  console.warn(
    'RTF to HTML conversion is a stub. Buffer length:',
    buffer.length // Using buffer to satisfy linter
  );
  // Placeholder for actual RTF to styled HTML conversion logic
  // Recommended: Use Gotenberg (LibreOffice) or direct LibreOffice CLI on server.
  return Promise.resolve(
    '<div data-format="rtf"><p>RTF content will be processed here. <strong>Styled conversion requires advanced server-side tools like LibreOffice.</strong> This is a placeholder.</p></div>'
  );
}
