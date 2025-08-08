/* global WebImporter */
export default function parse(element, { document }) {
  // Define header row exactly as specified
  const headerRow = ['Table (no header)'];
  const cells = [headerRow];

  // Get all direct children with class 'divider'
  const dividers = element.querySelectorAll(':scope > .divider');

  dividers.forEach(divider => {
    // Each divider contains a .w-layout-grid with two direct children (heading, paragraph)
    const grid = divider.querySelector('.w-layout-grid');
    if (grid) {
      // Get all direct children of grid (usually heading and paragraph)
      const rowChildren = Array.from(grid.children);
      // Check for at least two columns (heading and text)
      if (rowChildren.length >= 2) {
        // Reference the actual elements for semantic meaning and formatting
        cells.push([rowChildren[0], rowChildren[1]]);
      } else if (rowChildren.length === 1) {
        // Edge case: only one child, include it in a single cell row
        cells.push([rowChildren[0]]);
      }
      // If empty, skip (do not add empty rows)
    }
  });

  // Only create the table if there's at least the header and one data row
  if (cells.length > 1) {
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
  }
}