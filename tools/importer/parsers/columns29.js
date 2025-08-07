/* global WebImporter */
export default function parse(element, { document }) {
  // Extract columns (direct children)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  const numCols = columnDivs.length;

  // Get images or fallback to div
  const cells = columnDivs.map(colDiv => {
    const img = colDiv.querySelector('img');
    return img || colDiv;
  });

  // Build header row as an array with one cell, but the table-creation function will not set colspan
  // So, we set the colspan on the header cell manually after
  const rows = [
    ['Columns (columns29)'],
    cells,
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Fix the colspan on the header row to match number of columns
  const headerRow = table.querySelector('tr');
  if (headerRow && numCols > 1) {
    const th = headerRow.querySelector('th');
    if (th) {
      th.setAttribute('colspan', numCols);
    }
  }

  // Replace element
  element.replaceWith(table);
}
