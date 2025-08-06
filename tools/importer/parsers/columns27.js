/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that represents the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all immediate children (each column)
  const columns = Array.from(grid.children);

  // Compose the header row - exactly one cell, matching instructions
  const headerRow = ['Columns (columns27)'];

  // Compose the content row with all columns (each child of grid)
  const contentRow = columns.map(col => col);

  // Only create table if at least one column exists
  if (contentRow.length === 0) return;
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
