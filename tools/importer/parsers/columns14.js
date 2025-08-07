/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid for columns content
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);
  if (children.length === 0) return;

  // Compose the columns for the block: column 1 = heading + (optionally others), column 2 = all remaining content
  // For this HTML, the first column is the heading, the second column is the p + button.
  const heading = children.find(el => el.tagName === 'H2');
  const otherContent = children.filter(el => el !== heading);

  // Instead of splitting exactly by HTML structure, group all content after the heading into a single cell
  const headerRow = ['Columns (columns14)'];
  const columnsRow = [heading, otherContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}
