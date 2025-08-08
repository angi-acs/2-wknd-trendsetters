/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid with columns structure
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get the column elements (should be two: image and right content)
  const columns = Array.from(grid.children);
  // Defensive: if fewer than 2 columns, do nothing
  if (columns.length < 2) return;

  // The left column is expected to be the image element
  const leftCol = columns[0];

  // The right column is a div with multiple pieces of text content
  const rightCol = columns[1];

  // Table header matches example
  const headerRow = ['Columns (columns32)'];
  // Content row: each column is represented by existing DOM elements
  const contentRow = [leftCol, rightCol];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
