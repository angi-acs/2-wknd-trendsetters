/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: matches exactly
  const headerRow = ['Columns (columns7)'];

  // Get all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, put all of its direct children (not just images) as cell content
  // This ensures if there are headings, lists, buttons, etc., they're included
  const cells = columns.map(col => {
    // If the column has multiple children, include them all
    if (col.children.length > 1) {
      return Array.from(col.children);
    }
    // If the column has a single child, use that element
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    // Fallback: if it has text only
    if (col.textContent && col.textContent.trim()) {
      return col.textContent.trim();
    }
    // Else empty cell
    return '';
  });

  // Compose the table
  const table = [headerRow, cells];

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
