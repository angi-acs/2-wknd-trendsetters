/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must be a single cell
  const headerRow = ['Columns (columns11)'];

  // Find the main container
  const container = element.querySelector('.container');
  // Top grid: left (headline), right (body)
  const topGrid = container.querySelector('.grid-layout.tablet-1-column');
  const leftCol = topGrid.children[0];
  const rightCol = topGrid.children[1];

  // Bottom grid: two images
  const bottomGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  const bottomCells = Array.from(bottomGrid ? bottomGrid.children : []);
  // Ensure two columns in bottom row
  const secondContentRow = [
    bottomCells[0] || document.createElement('div'),
    bottomCells[1] || document.createElement('div')
  ];

  // First content row (two columns)
  const firstContentRow = [leftCol, rightCol];

  // Compose table: header row is single column, then rows with two columns
  const cells = [
    headerRow, // single-cell header row
    firstContentRow,
    secondContentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
