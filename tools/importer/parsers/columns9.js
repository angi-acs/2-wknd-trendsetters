/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid of columns within the footer
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Each child of grid is a column
  const columns = Array.from(grid.children);

  // Table header must be a single cell with the block name
  const headerRow = ['Columns (columns9)'];
  // Content row: each cell is one column of content
  const contentRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}