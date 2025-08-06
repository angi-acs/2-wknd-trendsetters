/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  let grid = element.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) {
    // Fallback: look for first div with more than one child
    const containers = element.querySelectorAll('div');
    for (const cont of containers) {
      if (cont.children.length > 1) {
        grid = cont;
        break;
      }
    }
  }
  if (!grid) grid = element; // final fallback

  // Get direct children of the grid for the columns
  const columns = Array.from(grid.children);

  // Build header row: must be a single column
  const headerRow = ['Columns (columns35)'];
  // Content row: as many columns as found
  const contentRow = columns;

  // Build the table to match strict requirements
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
