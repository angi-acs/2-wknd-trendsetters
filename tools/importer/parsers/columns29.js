/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, use its children (typically 1 div with an <img> inside)
  const columnCells = columns.map(col => {
    // If the child is just a wrapper for the image, unwrap it for table cell
    if (col.children.length === 1 && col.firstElementChild.tagName === 'IMG') {
      return col.firstElementChild;
    } else if (col.children.length === 1 && col.firstElementChild.children.length === 1 && col.firstElementChild.firstElementChild.tagName === 'IMG') {
      return col.firstElementChild.firstElementChild;
    } else {
      // Fallback: put all children in as an array
      return Array.from(col.childNodes).filter(n => n.nodeType === 1 ? n.tagName !== 'SCRIPT' : true);
    }
  });
  const headerRow = ['Columns (columns29)'];
  const tableRows = [headerRow, columnCells];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}