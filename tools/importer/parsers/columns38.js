/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // If there are no columns, do nothing
  if (columns.length === 0) return;
  // The header row must be a single cell, even if there are multiple columns
  const headerRow = ['Columns (columns38)'];
  // The next row has one cell per column
  const contentRow = columns;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
