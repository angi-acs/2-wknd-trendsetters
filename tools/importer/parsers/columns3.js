/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children (columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Create header row: single cell with exact header text
  const headerRow = ['Columns (columns3)'];
  // Create content row: one cell per column
  const contentRow = columns;

  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
