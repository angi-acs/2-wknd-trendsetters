/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly
  const headerRow = ['Hero (hero6)'];

  // Find the background image (first img.cover-image in the header)
  const bgImg = element.querySelector('img.cover-image');
  const bgImgRow = [bgImg ? bgImg : ''];

  // Find the card containing the actual text and CTAs
  const card = element.querySelector('.card');
  const contentEls = [];
  if (card) {
    // Title (h1)
    const h1 = card.querySelector('h1');
    if (h1) contentEls.push(h1);
    // Subheading (p.subheading)
    const subheading = card.querySelector('p.subheading');
    if (subheading) contentEls.push(subheading);
    // Call-to-actions (all links in .button-group)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      // Don't wrap in a new element; just include links in order
      const links = Array.from(buttonGroup.querySelectorAll('a'));
      if (links.length) contentEls.push(...links);
    }
  }
  const contentRow = [contentEls.length ? contentEls : ''];

  // Compose the table
  const cells = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
