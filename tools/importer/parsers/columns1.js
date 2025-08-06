/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  
  // Get all direct children of the grid (should be 2: image and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imageCol = columns[0];
  // Second column: content (headings, para, buttons)
  const contentCol = columns[1];

  // The 'Columns (columns1)' header, exactly as required
  const headerRow = ['Columns (columns1)'];
  // Place the two existing elements as the two columns in the content row
  const row = [imageCol, contentCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  element.replaceWith(table);
}
