/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table Header: must match exactly to the example
  const headerRow = ['Hero (hero12)'];

  // 2. Background Image row: Only the prominent background image
  // The structure: first .grid-layout > first child > img.cover-image.utility-position-absolute
  let bgImg = null;
  const mainGrid = element.querySelector('.grid-layout.desktop-1-column');
  if (mainGrid && mainGrid.children.length > 0) {
    const bgImgContainer = mainGrid.children[0];
    bgImg = bgImgContainer.querySelector('img.cover-image.utility-position-absolute');
  }

  // 3. Content row
  // Second .grid-layout > second child > .card-body > .grid-layout.desktop-3-column
  let contentCell = null;
  if (mainGrid && mainGrid.children.length > 1) {
    const contentContainer = mainGrid.children[1];
    // The main content is inside .card-body > .grid-layout.desktop-3-column
    const cardBody = contentContainer.querySelector('.card-body');
    if (cardBody) {
      const grid3col = cardBody.querySelector('.grid-layout.desktop-3-column');
      if (grid3col) {
        // We will assemble all children inside grid3col into a single block div
        const wrap = document.createElement('div');
        Array.from(grid3col.children).forEach(child => wrap.appendChild(child));
        contentCell = wrap;
      } else {
        contentCell = cardBody;
      }
    } else {
      contentCell = contentContainer;
    }
  }

  // Guarantee that empty values are not included as rows
  const rows = [
    headerRow,
    bgImg ? [bgImg] : [''],
    contentCell ? [contentCell] : [''],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
