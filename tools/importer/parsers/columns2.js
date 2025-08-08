/* global WebImporter */
export default function parse(element, { document }) {
  // Get main content grid
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  const children = Array.from(grid.children);
  // Defensive: Make sure there are enough columns
  if (children.length < 3) return;

  // LEFT COLUMN: Main card (first grid child)
  const leftColumn = children[0]; // <a>

  // RIGHT COLUMN: Stack of cards from next grid children
  // Each is a .flex-horizontal container with <a> links, <div.divider>
  // We want all <a> inside both right column containers in order
  function getAllLinks(parent) {
    return Array.from(parent.querySelectorAll(':scope > a'));
  }
  const rightCards1 = getAllLinks(children[1]);
  const rightCards2 = getAllLinks(children[2]);
  // Compose all right-side content
  const rightColumnItems = [...rightCards1, ...rightCards2];

  // Place all right cards into a single container for the right column cell
  const rightColumnDiv = document.createElement('div');
  rightColumnItems.forEach(item => rightColumnDiv.appendChild(item));

  // Header row must match exactly
  const headerRow = ['Columns (columns2)'];
  // Second row: 2 columns
  const row = [leftColumn, rightColumnDiv];
  const cells = [headerRow, row];
  // Create and replace block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
