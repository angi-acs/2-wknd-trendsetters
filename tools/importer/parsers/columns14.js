/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Only proceed if we have 2 columns (as shown in the HTML example)
  if (columns.length !== 2) return;

  // Reference the existing elements directly for each column
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Build the table structure
  const headerRow = ['Columns (columns14)'];
  const contentRow = [leftCol, rightCol];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
