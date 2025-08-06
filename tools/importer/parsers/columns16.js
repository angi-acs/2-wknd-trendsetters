/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the column wrappers)
  const columnDivs = Array.from(grid.children);

  // For each column, collect all content (not just img, but ALL block content)
  // This ensures that mixed text+image columns will be handled
  const cells = columnDivs.map(col => {
    // Get the inner block that holds the actual column content (usually the first child)
    // If there is only one main child, use it; otherwise, gather all children
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    // If more than one content block, return an array of all children
    return Array.from(col.children);
  });

  // Compose table rows to match the single header and single row of columns
  const tableRows = [
    ['Columns (columns16)'],
    cells
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
