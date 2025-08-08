/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  
  // Get direct children of the grid (should be two: image and content)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Identify the image column and the content (text) column
  let imageCol = null;
  let textCol = null;
  for (const child of gridChildren) {
    if (child.tagName === 'IMG') {
      imageCol = child;
    } else {
      textCol = child;
    }
  }
  if (!imageCol || !textCol) return;

  // Table header as in example EXACTLY
  const headerRow = ['Columns (columns32)'];

  // Table second row: image as first column, text as second column
  const rowCells = [imageCol, textCol];

  // Create the block table
  const cells = [headerRow, rowCells];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  
  // Replace the original element
  element.replaceWith(block);
}
