/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get the immediate children (columns): image and right-side content
  const columns = Array.from(grid.children);
  // Defensive: Only proceed if there are at least 2 columns
  if (columns.length < 2) return;

  // Compose header row as in the requirement
  const headerRow = ['Columns (columns1)'];
  // Content row: each cell is the actual column DOM node (no clone!), preserving all child content and semantics
  const contentRow = columns;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
