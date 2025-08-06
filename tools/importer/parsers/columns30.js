/* global WebImporter */
export default function parse(element, { document }) {
  // Find the 3-column grid inside the provided section
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get immediate children of the grid: should be 4: name, tags, heading, text block
  const gridChildren = Array.from(grid.children);

  // Defensive: check there are at least 4 children
  if (gridChildren.length < 4) return;

  // Left column: name and tags
  const col1Frag = document.createDocumentFragment();
  // Name (first child)
  if (gridChildren[0].textContent.trim()) {
    col1Frag.appendChild(gridChildren[0]);
  }
  // Tags (second child) may contain multiple .tag divs
  if (gridChildren[1].children.length > 0) {
    col1Frag.appendChild(gridChildren[1]);
  }

  // Middle column: heading
  const col2 = gridChildren[2];
  // Right column: rich text block
  const col3 = gridChildren[3];

  // Build the table: header row, then a row with three columns
  const cells = [
    ['Columns (columns30)'],
    [col1Frag, col2, col3],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the section with the block
  element.replaceWith(block);
}
