/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero12)'];

  // 2. Background image (should be the absolutely positioned image)
  let bgImg = '';
  const possibleImgs = element.querySelectorAll('img');
  // Look for an image that is absolutely positioned (the background, not the card image)
  for (const img of possibleImgs) {
    if (img.classList.contains('utility-position-absolute')) {
      bgImg = img;
      break;
    }
  }

  // 3. Content: headline, subheading, CTA, etc. (should be the card body)
  let contentCell = '';
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    contentCell = cardBody;
  } else {
    // Fallback: try to get the card itself
    const card = element.querySelector('.card');
    if (card) {
      contentCell = card;
    }
  }

  // Compose the block table as specified
  const cells = [
    headerRow,
    [bgImg],
    [contentCell],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
