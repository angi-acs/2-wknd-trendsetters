/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Collect all direct children of the grid for columns
  const gridChildren = Array.from(grid.children);
  let leftColContent = null;
  let rightColContent = null;

  // Assign columns dynamically, prioritizing semantic content
  for (const child of gridChildren) {
    if (!leftColContent && child.querySelector && child.querySelector('h1')) {
      leftColContent = child;
    }
    if (!rightColContent && child.tagName === 'IMG') {
      rightColContent = child;
    }
  }

  // Fallbacks in case the structure changes
  if (!leftColContent) {
    leftColContent = gridChildren.find(c => c.tagName === 'DIV') || '';
  }
  if (!rightColContent) {
    rightColContent = grid.querySelector('img') || '';
  }

  // The header row must be exactly one column as per requirements
  const headerRow = ['Columns (columns15)']; // only one cell
  // The content row should have two cells for the two columns
  const contentRow = [leftColContent, rightColContent];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
