/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches exact block name/variant from example
  const headerRow = ['Columns (columns5)'];

  // Find the main grid with two columns
  const grid = element.querySelector('.grid-layout');
  let leftCol, rightCol;
  if (grid) {
    // get direct children of grid (should be 2: content & image)
    const topCols = Array.from(grid.children);
    // Defensive: look for a content container and an image
    // First column is usually a nested grid (with heading, text, buttons)
    if (topCols.length === 2) {
      // left: nested grid, right: image
      const leftGrid = topCols[0];
      // Unwrap nested grid/container if present
      let content = [];
      if (leftGrid.classList.contains('grid-layout') || leftGrid.classList.contains('container')) {
        content = Array.from(leftGrid.children);
      } else {
        content = [leftGrid];
      }
      // For each child of the left grid, collect into wrapper div
      const leftContentDiv = document.createElement('div');
      content.forEach(child => leftContentDiv.appendChild(child));
      leftCol = leftContentDiv;

      // right: image element (could be direct img or wrapped)
      rightCol = topCols[1];
      // If not an img, find the img inside
      if (rightCol && rightCol.tagName !== 'IMG') {
        const img = rightCol.querySelector('img');
        if (img) rightCol = img;
      }
      // If it's an img already, that's fine
    } else {
      // fallback: treat whole grid as one column
      leftCol = grid;
      rightCol = null;
    }
  } else {
    // fallback: use all direct children as columns
    const children = Array.from(element.children);
    leftCol = children[0] || null;
    rightCol = children[1] || null;
  }

  // If leftCol or rightCol is null, ensure they're empty
  // This prevents issues with missing columns
  const cells = [
    headerRow,
    [leftCol || '', rightCol || '']
  ];

  // Create table and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
