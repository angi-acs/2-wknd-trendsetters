/* global WebImporter */
export default function parse(element, { document }) {
  // Create the table header exactly as specified in the example
  const cells = [
    ['Table (no header)']
  ];

  // Select all direct children with class .divider (each block of Q&A)
  const dividerDivs = element.querySelectorAll(':scope > .divider');

  dividerDivs.forEach((divider) => {
    // Each divider contains a .w-layout-grid with two main children: question and answer
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return; // Skip if missing grid
    const gridChildren = Array.from(grid.children);
    if (gridChildren.length < 2) return; // Skip if not both present
    // Reference the existing DOM nodes directly, do not clone or create new nodes
    const question = gridChildren[0];
    const answer = gridChildren[1];
    // Each row is a single cell with both elements
    cells.push([[question, answer]]);
  });

  // Create the table using the provided helper, and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
