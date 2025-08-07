/* global WebImporter */
export default function parse(element, { document }) {
  // Find the immediate grid container for columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all top-level columns (should be image and content)
  const children = Array.from(grid.children);
  if (children.length < 2) return;

  // Reference the existing elements directly for each column
  const leftCol = children[0]; // e.g., image
  const rightCol = children[1]; // e.g., text content

  // Compose the table structure with header and content row
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns1)'],
    [leftCol, rightCol],
  ], document);

  element.replaceWith(table);
}
