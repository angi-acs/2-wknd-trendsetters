/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get the immediate children of the grid (should be columns)
  const columns = Array.from(grid.children);
  // Find the left column (the div with text and button)
  // and the right column (the image)
  let leftCol = null;
  let rightCol = null;
  columns.forEach((col) => {
    if (col.tagName === 'DIV' && !leftCol) leftCol = col;
    if (col.tagName === 'IMG' && !rightCol) rightCol = col;
  });
  // Ensure both columns exist
  if (!leftCol || !rightCol) return;
  // The header must match exactly
  const headerRow = ['Columns (columns27)'];
  const contentRow = [leftCol, rightCol];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}