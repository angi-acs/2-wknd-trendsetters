/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: must match example exactly
  const headerRow = ['Table (no header)'];
  const rows = [headerRow];

  // Each .divider is a row in the table
  const dividers = element.querySelectorAll(':scope > .divider');
  dividers.forEach(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (grid) {
      const cells = Array.from(grid.children); // should be [question, answer]
      // Defensive: If both present, use both, else include what's present
      if (cells.length === 2) {
        rows.push([[cells[0], cells[1]]]);
      } else if (cells.length === 1) {
        rows.push([[cells[0]]]);
      } else {
        // Fallback: just put the grid itself in the cell
        rows.push([[grid]]);
      }
    } else {
      // Fallback: add all divider child nodes in one cell
      rows.push([Array.from(divider.childNodes)]);
    }
  });

  // Replace the original element with the constructed table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
