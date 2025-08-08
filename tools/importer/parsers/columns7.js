/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must have a single cell with the block name
  const headerRow = ['Columns (columns7)'];

  // Get all columns (immediate children)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column div, if it contains only one child (usually an aspect wrapper), pass its content (e.g., image)
  // else, pass the whole column div
  const contentRow = columns.map((col) => {
    // If .utility-aspect-1x1, use its content (e.g. just the image)
    if (
      col.classList.contains('utility-aspect-1x1') &&
      col.children.length === 1 &&
      col.firstElementChild.tagName === 'IMG'
    ) {
      return col.firstElementChild;
    }
    // If .utility-aspect-1x1 but has more than just an image, include all its children
    if (col.classList.contains('utility-aspect-1x1')) {
      return Array.from(col.children);
    }
    // If not .utility-aspect-1x1, include the whole column div (in case of more complex content)
    return col;
  });

  // Build the table: First row is header, second row is an array of cell content for each column
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
