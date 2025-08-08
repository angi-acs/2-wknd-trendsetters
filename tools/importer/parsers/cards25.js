/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards25) table header
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  // All immediate children of the grid are possible card containers
  const children = Array.from(element.querySelectorAll(':scope > div'));

  children.forEach(card => {
    // Find the main image, always required for a card row
    const img = card.querySelector('img');
    if (!img) return;

    // Find title + description container (optional)
    let textCell = '';
    // On cards with text, it is inside .utility-padding-all-2rem
    const textWrapper = card.querySelector('.utility-padding-all-2rem');
    if (textWrapper) {
      textCell = textWrapper;
    }
    rows.push([img, textCell]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
