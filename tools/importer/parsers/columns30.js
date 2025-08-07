/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all direct children (columns) in the grid
  const columns = Array.from(grid.children);
  // Create the header row as a single cell with the correct block name
  const headerRow = ['Columns (columns30)'];
  // Create the content row with all columns
  const contentRow = columns;
  // Create the table structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  // Replace the original element with the block table
  element.replaceWith(table);
}
