/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid container (the one with columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  
  // 2. Collect all immediate column children
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // 3. Compose the cells array for createTable
  // Header row must match exactly the block name variant
  const headerRow = ['Columns (columns31)'];
  // Second row: one cell per column, each referencing the full column node
  const contentRow = columns.map(col => col);

  const cells = [
    headerRow,
    contentRow
  ];

  // 4. Create and insert the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
