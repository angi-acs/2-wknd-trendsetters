/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach(cardDiv => {
    // Find the first image in the cardDiv
    const img = cardDiv.querySelector('img');
    // Find text content (h1-h6 and/or p)
    let textWrapper = cardDiv.querySelector('.utility-padding-all-2rem');
    if (!textWrapper) {
      // If there's a relative-positioned div, try that (sometimes wraps text)
      textWrapper = cardDiv.querySelector('.utility-position-relative');
    }
    // Last resort: check for heading or paragraph directly in cardDiv
    if (!textWrapper && (cardDiv.querySelector('h1, h2, h3, h4, h5, h6') || cardDiv.querySelector('p'))) {
      textWrapper = cardDiv;
    }
    // Only include card if both image and some text content exist
    if (img && textWrapper && (textWrapper.querySelector('h1, h2, h3, h4, h5, h6') || textWrapper.querySelector('p'))) {
      rows.push([img, textWrapper]);
    }
  });

  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
