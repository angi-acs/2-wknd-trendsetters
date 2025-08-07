/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (columns)
  const columns = Array.from(grid.children);

  // Ensure the header row is a single cell exactly as required
  const headerRow = ['Columns (columns35)'];

  // Table array: header row (1 column), then content row (n columns)
  const tableRows = [
    headerRow,
    columns,
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
