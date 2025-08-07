/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header Row
  const headerRow = ['Hero (hero39)'];

  // 2. Background image row
  // Source structure: header > div.grid-layout > div (image) + div (content)
  // Find the grid-layout
  const gridLayout = element.querySelector(':scope > .w-layout-grid.grid-layout');
  let bgImg = null;
  if (gridLayout) {
    // The first child grid contains the image
    const gridKids = gridLayout.querySelectorAll(':scope > div');
    if (gridKids.length > 0) {
      bgImg = gridKids[0].querySelector('img');
    }
  }

  // 3. Content row: Heading, Paragraph, CTA (all as existing elements)
  let contentCell = [];
  if (gridLayout) {
    const gridKids = gridLayout.querySelectorAll(':scope > div');
    if (gridKids.length > 1) {
      const textBlock = gridKids[1];
      // Find h1
      const h1 = textBlock.querySelector('h1');
      if (h1) contentCell.push(h1);
      // Find large paragraph
      const para = textBlock.querySelector('p');
      if (para) contentCell.push(para);
      // Find CTA button (first <a> in .button-group)
      const buttonGroup = textBlock.querySelector('.button-group');
      if (buttonGroup) {
        const cta = buttonGroup.querySelector('a');
        if (cta) contentCell.push(cta);
      }
    }
  }

  // If none found, push empty string for robustness
  const cells = [
    headerRow,
    [bgImg || ''],
    [contentCell.length ? contentCell : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
