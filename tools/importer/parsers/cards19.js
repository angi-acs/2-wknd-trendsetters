/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block, table header from specification
  const headerRow = ['Cards (cards19)'];
  // Each card is a direct child div of the grid container
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [headerRow];
  cardDivs.forEach(cardDiv => {
    // Icon or image cell: always the first direct child div of cardDiv
    const iconCell = cardDiv.querySelector(':scope > div');
    // Text cell: the paragraph, always present
    const textCell = cardDiv.querySelector('p');
    // Edge-case handling (in case source HTML is malformed, skip row if text missing)
    if (!iconCell && !textCell) return;
    rows.push([iconCell || '', textCell || '']);
  });
  // Create the cards19 block table and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
