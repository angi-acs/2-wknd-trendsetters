/* global WebImporter */
export default function parse(element, { document }) {
  // Only one block table needed, no Section Metadata
  // Table header must be exactly 'Columns (columns1)'
  const headerRow = ['Columns (columns1)'];

  // Find the grid of columns (multi-column layout)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Extract direct children of the grid as columns
  const columns = Array.from(grid.children);

  // Each column is referenced as-is (no cloning, no creation)
  // If there are fewer than 2 columns, ensure at least 2 columns for layout consistency
  // But for this HTML, there are always 2: image and right content
  const columnsRow = columns.map(col => col);

  // Compose cells array: header row, then one row with columns
  const cells = [headerRow, columnsRow];

  // Create block table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
