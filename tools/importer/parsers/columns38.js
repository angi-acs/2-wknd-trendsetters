/* global WebImporter */
export default function parse(element, { document }) {
  // The block header row, must be a single cell spanning all columns
  const headerRow = ['Columns (columns38)'];

  // Get all direct children (columns) of the grid wrapper
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, include the entire column DIV element (to ensure all possible content is included)
  const contentRow = columns.map(col => col);

  // Build the table data as required: first row is header (single cell), second row is the columns
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
