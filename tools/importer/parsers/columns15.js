/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid with columns
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children).filter(Boolean);
  // Only use the first two children as columns
  const col1 = gridChildren[0] || document.createElement('div');
  const col2 = gridChildren[1] || document.createElement('div');
  // Header row is exactly one column
  const header = ['Columns (columns15)'];
  // Content row: one cell per column
  const row = [col1, col2];
  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    header,
    row
  ], document);
  element.replaceWith(table);
}
