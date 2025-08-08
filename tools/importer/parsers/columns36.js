/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the grid with two columns (text + images)
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;
  const cols = Array.from(grid.children);
  if (cols.length < 2) return;

  // Left column: Text content (heading, paragraph, buttons)
  const leftCol = cols[0];
  // Right column: Images
  const rightCol = cols[1];

  // For left column, reference the entire block
  // For right column, find inner image grid and collect images
  let imagesArr = [];
  const imageGrid = rightCol.querySelector('.grid-layout');
  if (imageGrid) {
    imagesArr = Array.from(imageGrid.querySelectorAll('img'));
  }
  // If no grid-layout, look for images directly inside rightCol
  if (!imagesArr.length) {
    imagesArr = Array.from(rightCol.querySelectorAll('img'));
  }

  // Compose table structure
  const headerRow = ['Columns (columns36)'];
  const contentRow = [leftCol, imagesArr];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
