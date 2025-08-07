/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs representing columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the sole image or, if not just an image, the whole div
  const colCells = columns.map(col => {
    const img = col.querySelector('img');
    if (img && col.childElementCount === 1) {
      return img;
    }
    return col;
  });

  // Build table rows: first row is a single header cell, second row is N columns
  const tableRows = [
    ['Columns (columns4)'], // single cell header row
    colCells                // one cell per column in content row
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
