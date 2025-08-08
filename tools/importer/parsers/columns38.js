/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell, exactly as in the example
  const headerRow = ['Columns (columns38)'];

  // Get immediate children (these are the direct column divs)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  
  // Each column's meaningful content (usually an image in this layout)
  // Reference the existing child element (image), not the parent div
  const contentRow = columns.map(col => {
    // If there's only one child and it's an image, use that directly
    if (col.children.length === 1 && col.firstElementChild.tagName === 'IMG') {
      return col.firstElementChild;
    }
    // Otherwise, include all direct children
    return Array.from(col.children);
  });

  // Structure: header row = 1 cell, content row = N columns (as shown in screenshot/example)
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
