/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container which holds the columns in this section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const colNodes = Array.from(grid.children);
  if (colNodes.length === 0) return;

  // Block header row as per the spec
  const headerRow = ['Columns (columns32)'];

  // Data row: use the actual elements as cells (referencing original elements)
  const dataRow = colNodes;

  // Build the table cells array
  const cells = [headerRow, dataRow];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
