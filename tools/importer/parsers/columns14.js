/* global WebImporter */
export default function parse(element, { document }) {
  // The block name is always a single-cell header row
  const headerRow = ['Columns (columns14)'];

  // Find the grid layout that represents the columns
  const grid = element.querySelector('.grid-layout');
  let contentRow = [];

  if (grid) {
    // Each immediate child of grid is a column
    const gridChildren = Array.from(grid.children);
    // Populate the content row with each column
    contentRow = gridChildren;
  } else {
    // Fallback: treat immediate children of element as columns
    contentRow = Array.from(element.children);
  }

  // Table: header row (single cell), content row (multiple columns)
  const cells = [
    headerRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
