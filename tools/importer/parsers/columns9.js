/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns container
  const grid = element.querySelector('.w-layout-grid');
  let columns = [];
  if (grid) {
    // Each direct child of the grid is a column
    columns = Array.from(grid.children);
  } else {
    // Fallback: treat all children of .container as columns
    const container = element.querySelector('.container');
    if (container) {
      columns = Array.from(container.children);
    } else {
      columns = Array.from(element.children);
    }
  }
  // Compose the block table rows
  // Header row is always a single cell
  const headerRow = ['Columns (columns9)'];
  // Second row should have exactly as many columns as found
  // Each cell is the direct reference to the column element
  const contentRow = columns;
  // Only create the table if there are columns
  if (columns.length > 0) {
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      contentRow
    ], document);
    element.replaceWith(table);
  }
}