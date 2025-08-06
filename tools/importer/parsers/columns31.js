/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container which holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children (columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Build header row: exactly one column, as in the markdown example
  const headerRow = ['Columns (columns31)'];

  // Second row: as many columns as there are children in grid
  const contentRow = columns;

  // Build and replace with the correct table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
