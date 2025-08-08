/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container inside the section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get the immediate children of the grid (should match columns visually)
  const columns = Array.from(grid.children);
  // If there are less than 2 columns, do not create a columns block
  if (columns.length < 2) return;
  // Table header as per specification
  const headerRow = ['Columns (columns27)'];
  // Each column cell should reference the entire immediate child (not its innerHTML)
  const contentRow = columns.map(col => col);
  // Compose the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  // Replace the original section with the block table
  element.replaceWith(table);
}
