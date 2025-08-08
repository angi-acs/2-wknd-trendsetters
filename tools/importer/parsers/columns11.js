/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid that holds the two top columns
  const container = element.querySelector('.container');
  if (!container) return;

  const mainGrid = container.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;
  // Grids may use direct children
  const gridChildren = Array.from(mainGrid.children);

  // Left/top column (title area)
  const leftCol = gridChildren[0];
  // Right/top column (description and author)
  const rightCol = gridChildren[1];

  // Find the images grid for the bottom row
  const imagesGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let img1 = null, img2 = null;
  if (imagesGrid) {
    const imgDivs = imagesGrid.querySelectorAll('img');
    img1 = imgDivs[0] || '';
    img2 = imgDivs[1] || '';
  }

  // Compose the block table as in the example
  const cells = [
    ['Columns (columns11)'],
    [leftCol, rightCol],
    [img1, img2]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
