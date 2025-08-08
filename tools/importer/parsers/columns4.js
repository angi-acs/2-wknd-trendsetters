/* global WebImporter */
export default function parse(element, { document }) {
  // Block name header, exactly as required
  const headerRow = ['Columns (columns4)'];

  // Get direct children: these are the columns
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Edge case: if no columns found, just output header
  if (columnDivs.length === 0) {
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
    return;
  }

  // Each column: if it is a wrapper for a single image, just use the image
  // Otherwise, use the column div itself
  const columns = columnDivs.map(col => {
    // Use the first child (typically the image) if only one child
    if (col.children.length === 1 && col.firstElementChild.tagName.toLowerCase() === 'img') {
      return col.firstElementChild;
    }
    // Otherwise, use the column div itself
    return col;
  });

  // Compose table with header and one row of columns
  const tableCells = [
    headerRow,
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace original element
  element.replaceWith(table);
}
