/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards24): 2 columns, 1 header, 1 row per card.
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Each card is an <a> child of the element
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach((card) => {
    // First cell: image (mandatory)
    let img = null;
    const aspectDiv = card.querySelector('.utility-aspect-2x3');
    if (aspectDiv) {
      img = aspectDiv.querySelector('img');
    }
    // Second cell: text content
    // Compose: tag (optional), date (optional), heading (mandatory)
    const textParts = [];
    const metaRow = card.querySelector('.flex-horizontal');
    if (metaRow) {
      textParts.push(metaRow);
    }
    const heading = card.querySelector('h3');
    if (heading) {
      textParts.push(heading);
    }
    rows.push([img, textParts]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
