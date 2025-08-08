/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container that defines the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get immediate children of the grid (these are the columns)
  const cols = Array.from(grid.children);
  // Defensive: ensure we have at least two columns
  if (cols.length < 2) return;
  // Table header must exactly match the example
  const headerRow = ['Columns (columns27)'];
  // Build cells for the second row
  // Reference each column element directly
  const secondRow = [cols[0], cols[1]];
  // Create the block table
  const block = WebImporter.DOMUtils.createTable([headerRow, secondRow], document);
  // Replace the original section element with the new block table
  element.replaceWith(block);
}
