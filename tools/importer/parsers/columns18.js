/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell
  const headerRow = ['Columns (columns18)'];

  // Find the grid container with columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  let leftContent = [];
  let rightContent = [];
  let imageContent = [];

  gridChildren.forEach((col) => {
    if (
      col.querySelector('h2') ||
      col.querySelector('h3') ||
      col.querySelector('p')
    ) {
      leftContent = Array.from(col.children);
    } else if (col.tagName === 'UL') {
      // Each <li> is a contact card
      rightContent = Array.from(col.children);
    } else if (col.querySelector('img')) {
      const img = col.querySelector('img');
      if (img) imageContent = [img];
    } else if (col.tagName === 'IMG') {
      imageContent = [col];
    }
  });

  // Compose the row with three columns
  const row = [
    leftContent.length > 0 ? leftContent : [''],
    rightContent.length > 0 ? rightContent : [''],
    imageContent.length > 0 ? imageContent : ['']
  ];

  // Create the table with a single-cell header and a row with three columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow, // single cell header
    row        // row with three columns
  ], document);

  element.replaceWith(table);
}
