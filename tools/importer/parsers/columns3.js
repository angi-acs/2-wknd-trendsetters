/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // The header row must be a single item array, matching example exactly
  const headerRow = ['Columns (columns3)'];

  // Second row: each column cell contains the corresponding column content
  const contentRow = columns;

  // Build the table cells: header is a single cell, content row has n columns
  const cells = [headerRow, contentRow];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
