/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid element containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  
  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // The header row must be a single cell, even if more than one column in content row
  const headerRow = ['Columns (columns35)'];

  // Assemble the table rows:
  // First row: header (1 column)
  // Second row: as many columns as 'columns' found
  // If columns.length === 1, pad to 2 columns (match example), else use columns.length
  let contentRow = columns;
  if (columns.length === 1) {
    contentRow = [columns[0], '']; // pad to 2 columns
  }

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
