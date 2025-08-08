/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must be a single cell array for correct spanning
  const headerRow = ['Columns (columns31)'];

  // Find the grid layout containing columns
  let grid = element.querySelector('.grid-layout');
  if (!grid) grid = element;

  // Each direct child is a column
  const columns = Array.from(grid.children);

  // Compose table: header row is a single array, second row is columns
  const cells = [headerRow, columns];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
