/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row exactly as specified
  const headerRow = ['Columns (columns9)'];

  // 2. Find the grid layout container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // 3. Get immediate children of the grid (the columns)
  const columns = Array.from(grid.children);

  // 4. If there are no columns, do nothing
  if (columns.length === 0) return;

  // 5. Compose a block table with one header row, one content row
  const cells = [headerRow, columns];

  // 6. Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 7. Replace the source element with the new block table
  element.replaceWith(block);
}
