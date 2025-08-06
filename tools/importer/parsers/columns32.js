/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid, which should represent columns
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Each column is referenced directly as required
  // Table header as specified
  const headerRow = ['Columns (columns32)'];

  // Second row: the columns themselves as cells
  const contentRow = columns;

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table block
  element.replaceWith(table);
}