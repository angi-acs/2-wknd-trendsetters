/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct child elements of the grid (the columns)
  const columns = Array.from(grid.children);

  // Header row: single cell/column only
  const headerRow = ['Columns (columns9)'];

  // Content row: one cell per column (reference the elements directly)
  const contentRow = columns;

  // Build the table data: first row is single header cell, second row is all columns
  const tableData = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
