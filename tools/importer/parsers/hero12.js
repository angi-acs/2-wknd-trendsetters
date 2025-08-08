/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero12)'];

  // Find the background image (absolute-positioned image in the first grid cell)
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 0) {
    const maybeImg = gridDivs[0].querySelector('img');
    if (maybeImg) bgImg = maybeImg;
  }

  // Find main content (the second grid cell)
  let contentCell = '';
  if (gridDivs.length > 1) {
    // This div contains the card with all the text, side image, cta, etc
    const container = gridDivs[1];
    const cardBody = container.querySelector('.card-body');
    if (cardBody) {
      const grid = cardBody.querySelector('.grid-layout');
      if (grid) {
        // Side image (if any)
        const sideImg = grid.querySelector('img');
        // Text and CTA block (div)
        let textCtaDiv = null;
        const children = Array.from(grid.children);
        for (const child of children) {
          if (child.tagName === 'DIV') {
            textCtaDiv = child;
            break;
          }
        }
        // Compose: side image (if present), then text/cta block (if present)
        const cellArr = [];
        if (sideImg) cellArr.push(sideImg);
        if (textCtaDiv) cellArr.push(textCtaDiv);
        if (cellArr.length) {
          contentCell = cellArr;
        } else {
          contentCell = cardBody;
        }
      } else {
        contentCell = cardBody;
      }
    } else {
      contentCell = container;
    }
  }

  // Assemble table
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
