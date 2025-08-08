/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row as required by the block spec
  const headerRow = ['Hero (hero28)'];

  // 2. Extract the background image (optional)
  // The relevant <img> is inside the first .w-layout-grid > div
  let backgroundImgEl = null;
  const grid = element.querySelector(':scope > .w-layout-grid');
  if (grid) {
    const firstDiv = grid.children[0];
    if (firstDiv) {
      const img = firstDiv.querySelector('img');
      if (img) {
        backgroundImgEl = img;
      }
    }
  }
  const imageRow = [backgroundImgEl || ''];

  // 3. Extract the headline and content (title, etc)
  // In the second .w-layout-grid > div (the container)
  let textContentDiv = null;
  if (grid) {
    const secondDiv = grid.children[1];
    if (secondDiv) {
      // The content is the whole second container div
      textContentDiv = secondDiv;
    }
  }
  const textRow = [textContentDiv || ''];

  // 4. Compose the table for the block
  const cells = [headerRow, imageRow, textRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
