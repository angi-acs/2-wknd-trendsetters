/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must have two columns per the example
  const headerRow = ['Columns (columns2)', ''];

  // Locate the grid containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid
  const gridChildren = Array.from(grid.children);
  let leftCol = null, topRightCol = null, bottomRightCol = null;
  let found = 0;
  for (let child of gridChildren) {
    if (!leftCol && child.tagName === 'A' && child.classList.contains('utility-link-content-block')) {
      leftCol = child;
      found++;
      continue;
    }
    if (
      child.tagName === 'DIV' &&
      child.classList.contains('flex-horizontal') &&
      child.classList.contains('flex-vertical') &&
      child.classList.contains('flex-gap-sm')
    ) {
      if (!topRightCol) {
        topRightCol = child;
        found++;
        continue;
      } else if (!bottomRightCol) {
        bottomRightCol = child;
        found++;
        continue;
      }
    }
    if (found >= 3) break;
  }

  // Compose right cell by combining both right columns
  const rightCellContent = [];
  if (topRightCol) rightCellContent.push(topRightCol);
  if (bottomRightCol) rightCellContent.push(bottomRightCol);

  // Second row: two columns
  const secondRow = [leftCol ? leftCol : '', rightCellContent.length ? rightCellContent : ''];

  // Create the table with two columns in both header and content rows
  const table = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);
  element.replaceWith(table);
}
