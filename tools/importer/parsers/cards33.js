/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as in example
  const headerRow = ['Cards (cards33)'];
  // Select all card anchor elements (direct children, cards)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cardLinks.map(card => {
    // Card image (first img in card)
    const img = card.querySelector('img');

    // Find the inner grid holding the content next to the image
    const innerGrid = card.querySelector('.w-layout-grid');
    // Within that, the div after the img contains all text content
    let textDiv = null;
    if (innerGrid) {
      const children = Array.from(innerGrid.children);
      textDiv = children.find(child => child !== img);
    }
    // If fallback is needed, use the first div after img
    if (!textDiv) {
      textDiv = card.querySelector('div:not([class*="w-layout-grid"]):not(:has(img))');
    }
    // Accumulate text content
    const content = [];
    if (textDiv) {
      // Tag row (if present)
      const tagRow = textDiv.querySelector('.flex-horizontal');
      if (tagRow) content.push(tagRow);
      // Heading (h3 or .h4-heading)
      const heading = textDiv.querySelector('h3, .h4-heading');
      if (heading) content.push(heading);
      // Description (first p)
      const desc = textDiv.querySelector('p');
      if (desc) content.push(desc);
      // CTA ("Read") - typically the last div under textDiv
      // Find all direct child divs, take last one if it matches 'Read'
      const childDivs = Array.from(textDiv.children).filter(el => el.tagName === 'DIV');
      if (childDivs.length) {
        const ctaDiv = childDivs[childDivs.length - 1];
        if (ctaDiv && ctaDiv.textContent.trim().toLowerCase() === 'read') {
          content.push(ctaDiv);
        }
      }
    }
    return [img, content];
  });

  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
