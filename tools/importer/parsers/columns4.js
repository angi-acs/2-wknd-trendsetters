/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct column items
  const cols = Array.from(element.querySelectorAll(':scope > div'));

  // The header row must be a single cell (one column)
  const headerRow = ['Columns (columns4)'];

  // The content row: one cell for each column
  const contentRow = cols.length > 0 ? cols : [''];

  // Our block table: 2 rows, first is header single cell, second is N columns
  // WebImporter.DOMUtils.createTable will handle the colspan for the header
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
