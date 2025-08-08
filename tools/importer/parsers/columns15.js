/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the header row matches the example exactly
  const headerRow = ['Columns (columns15)'];

  // Find the main grid layout, which defines the columns structure
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // For each grid column, gather all child nodes (including text nodes)
    columns = Array.from(grid.children).map((col) => {
      // Gather heading, paragraph, buttons, and images in a column
      const content = [];
      Array.from(col.childNodes).forEach((node) => {
        if (node.nodeType === 3) { // Text node, preserve non-empty
          if (node.textContent.trim()) {
            // Create a span for text node to preserve semantic meaning
            const span = document.createElement('span');
            span.textContent = node.textContent;
            content.push(span);
          }
        } else if (node.nodeType === 1) { // Element node
          content.push(node);
        }
      });
      // If content is empty but column has no children
      if (content.length === 0) {
        content.push(col);
      }
      return content;
    });
  } else {
    // Fallback: treat element itself as a single column
    columns = [[element]];
  }

  // Build the block table: header, then columns as a single row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columns
  ], document);

  // Replace the original element with the new structured table
  element.replaceWith(table);
}
