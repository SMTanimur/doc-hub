// Note: Converting XLS/XLSX to high-fidelity HTML tables with preserved styles
// is best handled by tools like LibreOffice (via Gotenberg or direct command line)
// or commercial SDKs. Libraries like SheetJS (xlsx) can parse data and some formatting
// but full style replication is complex.

export async function convertXlsxToHtml(buffer: Buffer): Promise<string> {
  console.warn(
    'XLSX to HTML conversion is a stub. Buffer length:',
    buffer.length // Using buffer to satisfy linter
  );
  // Placeholder for actual XLSX to styled HTML table conversion logic
  // Recommended: Use Gotenberg (LibreOffice) or direct LibreOffice CLI on server.
  return Promise.resolve(
    '<div data-format="xlsx"><p>XLS/XLSX content will be processed here. <strong>Styled table conversion requires advanced server-side tools like LibreOffice.</strong> This is a placeholder.</p><table><tr><td>Sample</td><td>Data</td></tr><tr><td>1</td><td>2</td></tr></table></div>'
  );
}
