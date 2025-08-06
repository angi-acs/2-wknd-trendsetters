/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container, which contains the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Header row must be a single cell (per requirements and example)
  const headerRow = ['Columns (columns14)'];
  // Second row: each column in its own cell
  const contentRow = columns;

  // Create the block table with exactly two rows: header (1 cell), content (n cells)
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  // Replace the original element
  element.replaceWith(table);
}
