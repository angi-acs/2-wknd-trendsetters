/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid columns
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all columns (direct children of the grid)
  const columns = Array.from(grid.children).filter(child => child.nodeType === 1);

  // The columns block should have:
  // - First row (header): single column with block name
  // - Second row: one cell for each column (side by side)
  // - No additional rows (unless there is more stacked content, which there is not in the provided HTML)
  // This matches the example markdown structure for the footer block
  const cells = [];
  const headerRow = ['Columns (columns9)'];
  cells.push(headerRow);
  cells.push(columns);

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
