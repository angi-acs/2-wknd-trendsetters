/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid
  const cols = Array.from(grid.children);
  // Number of columns in this block
  const numCols = cols.length;

  // Header row must be a single cell, even if the content row has multiple columns
  const headerRow = ['Columns (columns30)'];

  // Content row contains all columns as separate cells
  const contentRow = cols;

  const cells = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
