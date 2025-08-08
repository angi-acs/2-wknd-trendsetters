/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid element containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Each direct child of grid is a column
  const gridColumns = Array.from(grid.children);
  if (!gridColumns.length) return;

  // For this block, the content is ONLY the images, one per column
  const images = gridColumns.map(col => {
    const img = col.querySelector('img');
    return img ? img : '';
  });

  // Build cells: header row is a single cell, content row has images
  const cells = [
    ['Columns (columns16)'], // header row, single cell
    images                   // content row, one cell per image
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
