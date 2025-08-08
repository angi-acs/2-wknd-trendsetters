/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (contains the columns)
  const grid = element.querySelector('.grid-layout, .w-layout-grid');
  let columns = [];

  if (grid) {
    // Get the direct children of the grid -- these are the columns/cells
    columns = Array.from(grid.children);
  }

  // Defensive: If no grid found, fallback to all immediate children of .container
  if (columns.length === 0) {
    const container = element.querySelector('.container');
    if (container) {
      columns = Array.from(container.children);
    }
  }

  // If still nothing, fallback to all immediate children
  if (columns.length === 0) {
    columns = Array.from(element.children);
  }

  // Only keep 2 columns (matching the design); if more, keep all
  // This makes the function general for future variations

  // Table header for the block name (must match the spec exactly)
  const headerRow = ['Columns (columns27)'];
  // Table content row: columns as cells
  const contentRow = columns;

  // Create the table array
  const cells = [headerRow, contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
