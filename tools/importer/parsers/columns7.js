/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, get the main image or the entire column
  const cells = columns.map(col => {
    const img = col.querySelector('img');
    return img ? img : col;
  });
  // Header row is a single cell array
  const tableRows = [
    ['Columns (columns7)'], // single header cell
    cells // content row (one cell per column)
  ];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
