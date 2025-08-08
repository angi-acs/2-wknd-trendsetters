/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero39)'];

  // Find the background image: the first <img> in the structure
  let backgroundImg = null;
  const imgEls = element.querySelectorAll('img');
  if (imgEls.length > 0) {
    backgroundImg = imgEls[0]; // reference existing element
  }
  const imageRow = [backgroundImg ? backgroundImg : ''];

  // Find the text panel: headline, paragraph(s), button(s)
  // In this HTML, it's the 2nd (right) column of the grid
  let contentCellParts = [];

  // Get the direct div children of .grid-layout (the main layout grid)
  const mainGrid = element.querySelector('.grid-layout');
  if (mainGrid) {
    const gridChildren = mainGrid.querySelectorAll(':scope > div');
    // The right side content is in the second div
    if (gridChildren.length > 1) {
      const textContainer = gridChildren[1];
      // It in turn contains a grid with h1 and a flex container
      const innerGrid = textContainer.querySelector('.grid-layout');
      if (innerGrid) {
        // Add the h1 if present
        const h1 = innerGrid.querySelector('h1');
        if (h1) contentCellParts.push(h1);
        // Find flex container with paragraph and button group
        const flex = innerGrid.querySelector('.flex-vertical');
        if (flex) {
          // Paragraph(s)
          flex.querySelectorAll('p').forEach(p => contentCellParts.push(p));
          // Button group (may contain multiple CTAs)
          const buttonGroup = flex.querySelector('.button-group');
          if (buttonGroup) {
            buttonGroup.querySelectorAll('a').forEach(a => contentCellParts.push(a));
          }
        }
      }
    }
  }
  const contentRow = [contentCellParts.length ? contentCellParts : ''];

  // Build block table (always 1 column, 3 rows)
  const cells = [headerRow, imageRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
