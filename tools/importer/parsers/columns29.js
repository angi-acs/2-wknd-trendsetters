/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (which are the aspect ratio wrappers)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Each cell in the row should be the wrapper div (including its img)
  const columns = columnDivs;

  // The table should have a single-cell header row, then a row with all columns
  const cells = [
    ['Columns (columns29)'], // Exactly one cell in the header row
    columns // Second row: one cell per column
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
