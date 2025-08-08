/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero6)'];

  // 2. Find the background image (row 2)
  let bgImg = null;
  // Look for an img with class 'cover-image' inside any grid-layout div
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid');
  for (const grid of gridDivs) {
    const img = grid.querySelector('img.cover-image');
    if (img) {
      bgImg = img;
      break;
    }
  }
  // If not found, leave the cell empty
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Find the card content: heading, subheading, CTAs (row 3)
  let contentCell = '';
  // Card is inside grid-layout > .container > grid-layout > .card
  for (const grid of element.querySelectorAll('.w-layout-grid')) {
    const card = grid.querySelector('.card');
    if (card) {
      contentCell = card;
      break;
    }
  }
  const contentRow = [contentCell];

  // 4. Assemble the table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the original element
  element.replaceWith(table);
}
