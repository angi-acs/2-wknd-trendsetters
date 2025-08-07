/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all immediate children of the grid-layout (the columns)
  const columns = Array.from(grid.children);
  if (!columns.length) return;
  // Table header must be one cell, as the example shows
  const headerRow = ['Columns (columns31)'];
  // The content row must have as many columns as grid children
  const contentRow = columns;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  // After table creation, set the first th to have colspan for correct HTML render
  const th = table.querySelector('th');
  if (th && columns.length > 1) {
    th.setAttribute('colspan', String(columns.length));
  }
  // Replace the original element with the table
  element.replaceWith(table);
}
