/* global WebImporter */
export default function parse(element, { document }) {
  // Header must be a single cell according to the example
  const headerRow = ['Columns (columns35)'];

  // Find the grid container inside the section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid – these are the columns
  const columns = Array.from(grid.children);

  // Defensive: ensure we always have at least two columns
  while (columns.length < 2) {
    columns.push(document.createElement('div'));
  }

  // Prepare the rows for the block table
  // First row: headerRow (single cell)
  // Second row: columns (as many as exist in source)
  const cells = [headerRow, columns];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
