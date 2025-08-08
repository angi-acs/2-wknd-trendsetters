/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns grid container in the block
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Each immediate child of grid is a column
  const columns = Array.from(grid.children);
  // For each column, extract its block content (which for this HTML is just the image inside)
  const columnCells = columns.map(col => {
    // Get the content block for this 'column' (using the direct descendant that holds the image)
    // Use the full block for resilience, but in this case, it's the .utility-aspect-2x3 div
    const content = col.querySelector('.utility-aspect-2x3');
    // If not found, fallback to the column itself
    return content ? content : col;
  });

  // Table: header is a single-cell row, then data row matching the number of columns
  const tableRows = [
    ['Columns (columns16)'],
    columnCells
  ];
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(blockTable);
}
