/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell, not spread across multiple columns
  const headerRow = ['Columns (columns31)'];

  // Find the columns container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children, each is a column
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // The next row consists of one cell per column (so, columns.length cells)
  const contentRow = columns;

  // Assemble the table: header row (1 cell), then content row (N cells)
  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
