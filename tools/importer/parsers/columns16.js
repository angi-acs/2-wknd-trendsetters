/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Each direct child of the grid is a column
  const columnDivs = Array.from(grid.children);

  // For each column, extract its entire content (not just the image)
  // This is more robust for future variations
  const columnCells = columnDivs.map(colDiv => {
    // If the column itself is a container, collect its children as content
    // If only one child, just return that element; else, return an array of its children
    const children = Array.from(colDiv.childNodes).filter(n => n.nodeType === Node.ELEMENT_NODE || (n.nodeType === Node.TEXT_NODE && n.textContent.trim()));
    if (children.length === 1) {
      return children[0];
    } else if (children.length > 1) {
      return children;
    } else {
      return '';
    }
  });

  // Create the table rows: header is one cell, then each column in the second row is a cell
  const tableRows = [
    ['Columns (columns16)'],
    columnCells
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
