/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columnEls = Array.from(grid.children);
  // The first row is always the block name
  const headerRow = ['Columns (columns35)'];
  // Each immediate child of grid is one column; for each, reference all direct children (or itself if it has no children)
  const columns = columnEls.map((col) => {
    // If column contains multiple elements, pass them as array
    if (col.children.length > 0) {
      return Array.from(col.children);
    }
    // Otherwise, it's a single element (like a link/button)
    return col;
  });
  // Compose table data and replace the original element
  const tableArray = [headerRow, columns];
  const blockTable = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(blockTable);
}
