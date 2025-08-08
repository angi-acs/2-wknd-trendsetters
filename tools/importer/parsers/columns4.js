/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child columns (these are the divs inside the grid)
  const columnDivs = Array.from(element.children);
  const colCount = columnDivs.length;

  // The header row should be a single cell, matching the example exactly
  const headerRow = ['Columns (columns4)'];

  // The second row must have as many columns as columnDivs
  const contentRow = columnDivs.map(col => col);

  // Compose the table structure
  const cells = [headerRow, contentRow];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  
  // Replace the original element
  element.replaceWith(table);
}
