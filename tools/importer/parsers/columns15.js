/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children).filter(Boolean);
  // Use only the first two columns, as shown in the example
  const leftColumn = gridChildren[0];
  const rightColumn = gridChildren[1];
  // Header row must exactly match spec
  const headerRow = ['Columns (columns15)'];
  // Second row: include full column element to ensure all text/content is present
  const contentRow = [leftColumn, rightColumn];
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
