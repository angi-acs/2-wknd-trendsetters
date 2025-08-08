/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure table header matches the example, one column only
  const headerRow = ['Columns (columns38)'];

  // Get all grid columns (direct children)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, build a cell: collect all child nodes (images, text, etc.)
  const columnCells = columnDivs.map((colDiv) => {
    // If the column contains only one child, just use it
    if (colDiv.childElementCount === 1) {
      return colDiv.firstElementChild;
    }
    // If there are multiple children, include all (image, text, etc.)
    const nodes = Array.from(colDiv.childNodes).filter(node => {
      // Exclude empty text nodes
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim().length > 0;
      }
      return true;
    });
    return nodes;
  });

  // Only a single block row is present in this HTML; no additional rows found
  // If more structure existed (text, buttons, etc.), add additional rows as needed
  const rows = [headerRow, columnCells];

  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
