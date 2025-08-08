/* global WebImporter */
export default function parse(element, { document }) {
  // The block name in the header row must exactly match the spec
  const headerRow = ['Columns (columns32)'];

  // Find the grid container (columns block)
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Collect direct children of the grid as columns
    columns = Array.from(grid.children);
  } else {
    // Fallback: try container direct children
    const container = element.querySelector('.container');
    if (container) {
      columns = Array.from(container.children);
    } else {
      columns = Array.from(element.children);
    }
  }

  // Defensive: if columns is empty, just return and do not replace
  if (!columns.length) return;

  // Build the block table cells
  const cells = [headerRow, columns];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
