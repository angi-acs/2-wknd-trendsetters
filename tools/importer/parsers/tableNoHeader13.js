/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in example
  const headerRow = ['Table (no header)'];
  const cells = [headerRow];

  // Find all immediate child .divider elements (these are the rows)
  const dividerBlocks = element.querySelectorAll(':scope > .divider');
  dividerBlocks.forEach((divider) => {
    // Each divider contains one grid-layout, which has two children: question (heading), answer (paragraph)
    const grid = divider.querySelector('.w-layout-grid');
    if (grid) {
      const children = grid.querySelectorAll(':scope > div');
      if (children.length >= 2) {
        // Reference both elements directly in a cell array
        cells.push([[children[0], children[1]]]);
      }
    }
  });

  // Create and insert the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}