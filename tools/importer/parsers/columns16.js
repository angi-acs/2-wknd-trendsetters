/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container which holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get all direct children of the grid (each column box)
  const columnDivs = Array.from(grid.children);

  // For each column, collect all meaningful children (including text, images, buttons, lists, etc.)
  const contentRow = columnDivs.map((col) => {
    // Traverse down to the deepest single-child div, if present
    let inner = col;
    while (
      inner.children.length === 1 &&
      inner.firstElementChild &&
      inner.firstElementChild.tagName === 'DIV'
    ) {
      inner = inner.firstElementChild;
    }

    // Gather all non-script child nodes (elements and text nodes)
    const children = Array.from(inner.childNodes).filter(
      node => (node.nodeType === 1 && node.tagName !== 'SCRIPT') || node.nodeType === 3 // text
    );

    // If content is only whitespace, skip it
    const filtered = children.filter(node => {
      if (node.nodeType === 3) {
        return node.textContent.trim().length > 0;
      }
      return true;
    });
    // Always return an array, even if just one element
    return filtered.length > 0 ? filtered : [inner];
  });

  // The table structure: header row (single column), then a row with all columns side by side
  const cells = [
    ['Columns (columns16)'],
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
