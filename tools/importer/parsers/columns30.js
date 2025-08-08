/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we have the expected container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the grid layout inside the container
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the top-level grid columns (direct children)
  const gridColumns = Array.from(grid.children);
  // Defensive code in case fewer than 3 columns exist
  const col1 = gridColumns[0] || document.createElement('div');
  const col2 = gridColumns[1] || document.createElement('div');
  // For column 3, it's actually two elements: the heading and the rich text
  let col3;
  if (gridColumns[2] && gridColumns[3]) {
    col3 = document.createElement('div');
    col3.appendChild(gridColumns[2]);
    col3.appendChild(gridColumns[3]);
  } else if (gridColumns[2]) {
    col3 = gridColumns[2];
  } else {
    col3 = document.createElement('div');
  }

  // Compose table header as shown in example
  const headerRow = ['Columns (columns30)'];

  // Compose the main block row for the columns
  const row = [col1, col2, col3];

  // Build the table array
  const tableArr = [headerRow, row];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableArr, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
