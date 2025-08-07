/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as specified
  const cells = [['Cards (cards24)']];
  // Find all direct anchor elements that represent cards
  const cards = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block'));

  cards.forEach((card) => {
    // First cell: the image (aspect ratio container)
    const imgContainer = card.querySelector('.utility-aspect-2x3');
    // Second cell: text content (tag/date row + heading)
    const textCell = document.createElement('div');
    // Tag/date row
    const tagRow = card.querySelector('.flex-horizontal');
    if (tagRow) textCell.appendChild(tagRow);
    // Heading (usually h3)
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) textCell.appendChild(heading);
    cells.push([imgContainer, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
