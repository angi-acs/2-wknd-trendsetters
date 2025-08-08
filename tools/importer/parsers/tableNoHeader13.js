/* global WebImporter */
export default function parse(element, { document }) {
  // The header row as in the example
  const cells = [['Table (no header)']];

  // Each immediate child .divider is a row (with 2 columns)
  const rowDividers = element.querySelectorAll(':scope > .divider');
  rowDividers.forEach(divider => {
    // Each divider contains a .grid-layout with 2 children: question (heading), answer (rich-text)
    const grid = divider.querySelector('.grid-layout');
    if (grid) {
      const question = grid.children[0];
      const answer = grid.children[1];
      // Add a row with both elements (reference directly)
      cells.push([[question, answer]]);
    }
  });
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
