/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must be a single cell with the block name
  const headerRow = ['Columns (columns38)'];

  // Content row: each direct child div is a column
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Table data: header row (single cell), then one content row with N cells
  const tableData = [headerRow, columnDivs];

  // Create table and replace original element
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
