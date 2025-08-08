/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each representing a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Header row: should be a single cell, as in the example
  const headerRow = ['Columns (columns7)'];

  // Content row: each cell is the content for a column
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    if (img) return img;
    if (col.childNodes.length) return Array.from(col.childNodes);
    return '';
  });

  // Table: header is a single cell, content row contains all columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
