/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Left column: main feature - first direct child anchor
  const leftColAnchor = grid.querySelector(':scope > a.utility-link-content-block');

  // Right column: combine all cards from both flex groups, stacked in order
  const flexGroups = grid.querySelectorAll(':scope > .flex-horizontal.flex-vertical');
  const rightColDiv = document.createElement('div');
  flexGroups.forEach(fg => {
    Array.from(fg.children).forEach(child => {
      if (child.tagName === 'A') {
        rightColDiv.appendChild(child);
      }
    });
  });

  // Compose the table as: header, then a single row with two columns
  const cells = [
    ['Columns (columns2)'],
    [leftColAnchor, rightColDiv]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
