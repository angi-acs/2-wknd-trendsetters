/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct child elements of the grid as columns
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // The header row must be a single cell (one column)
  const headerRow = ['Columns (columns30)'];

  // The next row is as many columns as needed (matching the grid columns)
  const contentRow = columns;

  // Compose the table array as required: header with one cell, then columns
  const tableData = [headerRow, contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
