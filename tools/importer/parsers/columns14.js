/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find grid structure (columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const cols = Array.from(grid.children);

  // 2. Prepare content for each column
  const columnCells = cols.map(col => {
    // For container columns (divs), include their children if present
    if (col.children.length > 0) {
      return Array.from(col.children);
    }
    // Otherwise, include the column element itself
    return [col];
  });

  // 3. Create header row: a single cell spanning all columns
  // We'll create a <th> with colspan set below manually, since createTable doesn't handle colspan
  // So we build the table, then fix the header cell after
  const cells = [
    ['Columns (columns14)'],
    columnCells
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 4. Fix header cell to span all columns
  const headerRow = table.querySelector('tr:first-child');
  if (headerRow) {
    const th = headerRow.querySelector('th');
    if (th) {
      th.setAttribute('colspan', columnCells.length);
    }
  }

  // 5. Replace original element
  element.replaceWith(table);
}
