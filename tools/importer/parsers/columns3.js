/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout which contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children (columns)
  const columns = Array.from(grid.children);

  // Match the block format: header row (one cell), then content row (as many columns as found)
  const headerRow = ['Columns (columns3)'];
  const contentRow = columns.map((col) => col);

  // Only create additional (empty) columns if you must always have 3 columns in the second row.
  // But the correct behavior is: use as many columns as in the HTML input, not always 3.

  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
