/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns container
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct child columns
  const columns = Array.from(grid.children);
  // Header row: should be an array with only one cell
  const headerRow = ['Columns (columns3)'];
  // Content row: one cell for each column
  const contentRow = columns;
  // Structure table with a single-cell header and a content row matching the number of columns
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(table);
}
