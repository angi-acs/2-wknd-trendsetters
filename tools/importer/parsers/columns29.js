/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell
  const headerRow = ['Columns (columns29)'];

  // Get all immediate child divs (columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the <img> element if present
  const columns = columnDivs.map(div => {
    const img = div.querySelector('img');
    return img || '';
  });

  // Compose the table: header is a single cell, second row has one cell per column
  const cells = [
    headerRow,
    columns
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
