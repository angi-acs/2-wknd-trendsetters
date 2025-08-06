/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: look for the container and main grid
  const container = element.querySelector(':scope > .container');
  if (!container) return;
  const gridLayout = container.querySelector(':scope > .w-layout-grid');
  if (!gridLayout) return;

  // Find the two main columns (left: text+buttons, right: image grid)
  // We expect exactly two direct children of the grid
  const gridChildren = Array.from(gridLayout.children).filter(el => el.nodeType === 1);
  if (gridChildren.length < 2) return;
  const leftCol = gridChildren[0];
  const rightCol = gridChildren[1];

  // For the left column: preserve all content (heading, subheading, buttons)
  // For the right column: get the grid of images (or fallback to the column itself)
  let rightContent;
  const imgGrid = rightCol.querySelector('.w-layout-grid');
  if (imgGrid) {
    rightContent = imgGrid;
  } else {
    rightContent = rightCol;
  }

  // Compose the table: header, then a row with both columns
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns36)'],
    [leftCol, rightContent]
  ], document);

  element.replaceWith(table);
}
