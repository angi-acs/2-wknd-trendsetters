/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, collect all children and preserve order/content
  // This allows for images, text, buttons, lists, etc to be handled
  const columnCells = columns.map(col => {
    // Gather all immediate children
    const children = Array.from(col.childNodes);
    // Filter: keep only elements or text nodes with non-whitespace
    const contents = children.filter(node => {
      if (node.nodeType === Node.ELEMENT_NODE) return true;
      if (node.nodeType === Node.TEXT_NODE) return node.textContent.trim() !== '';
      return false;
    });
    // If only one content, just return it; else, return array of all contents
    if (contents.length === 1) {
      return contents[0];
    }
    if (contents.length > 1) {
      return contents;
    }
    // Fallback to the whole column
    return col;
  });

  // Table header row: always single column as per example
  const headerRow = ['Columns (columns4)'];
  // Second row: one cell per column, each with the content from above
  const tableRows = [headerRow, columnCells];
  
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
