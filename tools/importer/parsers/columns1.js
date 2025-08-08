/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by block spec
  const headerRow = ['Columns (columns1)'];
  
  // Find the grid that holds the columns
  const grid = element.querySelector('.grid-layout, [class*="grid-layout"]');
  if (!grid) return;
  
  // Get all direct children of the grid, which are columns (e.g., <img>, <div>, etc.)
  // Use slice() to avoid live node list issues
  const columns = Array.from(grid.children);

  // Defensive: remove empty columns (should not happen, but safe)
  const nonEmptyColumns = columns.filter((col) => {
    // Ignore if column is empty or only whitespace
    if (!col) return false;
    // If it's an element and has children or non-empty textContent
    if (col.children.length > 0) return true;
    if (col.textContent && col.textContent.trim().length > 0) return true;
    if (col.tagName === 'IMG' && col.src) return true; // always keep images
    return false;
  });

  // The block expects one cell per column, containing the DOM elements
  const secondRow = nonEmptyColumns;
  
  const cells = [headerRow, secondRow];
  
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
