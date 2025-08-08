/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container for columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Collect all direct children of the grid as columns
  const columns = Array.from(grid.children);
  const numColumns = columns.length;

  // Build the header row to match the HTML structure
  // It should be a single cell, even if there are multiple columns below
  const headerRow = ['Columns (columns3)'];

  // Build the content row, with as many cells as there are columns in the grid
  // Each cell is the full content of its corresponding column
  const contentRow = columns.map((col) => {
    // Gather all non-empty nodes in the column
    const colChildren = Array.from(col.childNodes).filter((n) => {
      return n.nodeType !== Node.TEXT_NODE || n.textContent.trim().length > 0;
    });
    if (colChildren.length === 1) {
      return colChildren[0];
    } else if (colChildren.length > 1) {
      return colChildren;
    } else {
      return '';
    }
  });

  // Create the table block with the exact number of columns as found
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the newly created block table
  element.replaceWith(table);
}
