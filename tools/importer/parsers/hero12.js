/* global WebImporter */
export default function parse(element, { document }) {
  // Header row - must match example
  const headerRow = ['Hero (hero12)'];

  // Find background image (first img direct child of the top-level grid-layout)
  let bgImg = null;
  const grid = element.querySelector('.grid-layout.desktop-1-column');
  if (grid) {
    const gridDivs = grid.querySelectorAll(':scope > div');
    if (gridDivs.length > 0) {
      bgImg = gridDivs[0].querySelector('img');
    }
  }

  // Find content (headline, points, button) - the .card-body inside the .container
  let contentCell = null;
  const container = element.querySelector('.container');
  if (container) {
    const cardBody = container.querySelector('.card-body');
    if (cardBody) {
      contentCell = cardBody;
    } else {
      contentCell = container;
    }
  } else {
    // fallback, rare: use the whole element
    contentCell = element;
  }

  // Build the table rows. Each row is a single cell, as per the spec.
  const rows = [
    headerRow,
    [bgImg],
    [contentCell],
  ];

  // Clean up any undefined/null cells (e.g. if bgImg missing, cell must be empty)
  const cleanedRows = rows.map(row => row.map(cell => cell || ''));

  const table = WebImporter.DOMUtils.createTable(cleanedRows, document);
  element.replaceWith(table);
}
