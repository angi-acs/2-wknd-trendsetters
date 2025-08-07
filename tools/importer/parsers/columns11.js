/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main container with the two-column layout
  const container = element.querySelector('.container > .w-layout-grid.grid-layout.tablet-1-column');
  let leftCol = null;
  let rightCol = null;
  if (container) {
    const cols = Array.from(container.children);
    if (cols.length >= 2) {
      leftCol = cols[0];
      rightCol = cols[1];
    }
  }

  // Compose the left cell: Trend alert, h1, description, author/date, button
  const leftCell = document.createElement('div');
  if (leftCol) {
    Array.from(leftCol.children).forEach(child => leftCell.appendChild(child));
  }
  if (rightCol) {
    Array.from(rightCol.children).forEach(child => leftCell.appendChild(child));
  }

  // Get the two images for the other columns
  const imageGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let img1 = null, img2 = null;
  if (imageGrid) {
    const imgDivs = Array.from(imageGrid.children);
    if (imgDivs.length >= 2) {
      img1 = imgDivs[0].querySelector('img');
      img2 = imgDivs[1].querySelector('img');
    }
  }

  // Prepare the header row to have the same number of columns as the content row
  const headerRow = ['Columns (columns11)', '', ''];
  const columnsRow = [
    leftCell,
    img1 || '',
    img2 || ''
  ];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}
