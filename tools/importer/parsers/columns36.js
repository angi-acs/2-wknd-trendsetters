/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row - must match example exactly
  const headerRow = ['Columns (columns36)'];

  // Get the top-level grid which holds the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: content (heading, subheading, buttons)
  const leftCol = columns[0];
  // Second column: images grid (which itself contains three <img>s)
  const rightCol = columns[1];

  // For the right column, only the images should be placed in the cell (not the wrappers)
  // locate the images grid inside the right column
  const imgGrid = rightCol.querySelector('.w-layout-grid');
  let imgCellContent = [];
  if (imgGrid) {
    imgCellContent = Array.from(imgGrid.querySelectorAll('img'));
  }

  // Compose the row with the left column and right image cell
  const contentRow = [leftCol, imgCellContent];

  // Build the table and replace
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
