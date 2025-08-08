/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row with the exact block name
  const headerRow = ['Columns (columns5)'];

  // Find the main grid containing the two columns (text content and image)
  const mainGrid = element.querySelector(':scope > .w-layout-grid');
  if (!mainGrid) return;

  // The children of this grid should be two: a grid for the left content and an image for the right
  let leftContent = null;
  let rightImage = null;

  // Find the left column (nested grid) and right column (img)
  Array.from(mainGrid.children).forEach(child => {
    if (child.tagName === 'IMG') {
      rightImage = child;
    } else {
      leftContent = child;
    }
  });

  // For left content, include all direct children as a chunk (reference, don't clone)
  let leftCell = [];
  if (leftContent) {
    // If it's a grid, flatten its direct children (likely one column)
    const possibleGrid = leftContent.classList.contains('w-layout-grid') ? leftContent : null;
    if (possibleGrid) {
      // Take all grid children as content
      Array.from(possibleGrid.children).forEach(col => {
        leftCell.push(col);
      });
    } else {
      leftCell = Array.from(leftContent.children);
    }
  }

  // Build columns row (preserve order: left column, right image)
  const columnsRow = [leftCell, rightImage].filter(Boolean);

  // Assemble and replace with block table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
