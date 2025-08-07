/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container (should contain the grid layout)
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the grid layout for the main columns
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Find all direct children of the grid (these are our columns)
  const gridChildren = Array.from(grid.children);

  // We expect the left column to have the text content, the right the image
  // Find the left (text) column by presence of an h1
  let leftCol = gridChildren.find(child => child.querySelector('h1'));
  // Find the right (image) column by presence of an img
  let rightCol = gridChildren.find(child => child.querySelector('img'));

  // If for some reason, only one found, skip
  if (!leftCol || !rightCol) return;

  // Reference the actual elements for the cells
  const headerRow = ['Columns (columns15)'];
  const columnsRow = [leftCol, rightCol];

  // Build the table for the Columns block
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
