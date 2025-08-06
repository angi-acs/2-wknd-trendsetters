/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for columns5 block
  const cells = [['Columns (columns5)']];

  // Find the main grid that contains the two columns
  const outerGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!outerGrid) return;

  // The main content is a grid with two children: one inner grid (for text/cta), one image
  // Let's determine which is which
  let textCol = null;
  let imgCol = null;
  for (const child of Array.from(outerGrid.children)) {
    if (child.tagName === 'IMG') imgCol = child;
    else if (child.tagName === 'DIV') textCol = child;
  }

  // In the textCol, the actual text block is another grid, but we can just include all of textCol in the cell
  // First content row: [textCol, imgCol]
  const row = [textCol, imgCol];
  cells.push(row);

  // If there are additional rows of columns in the source, they should be added here
  // In the current HTML, there is only one row (the two columns: left = text, right = image)

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
