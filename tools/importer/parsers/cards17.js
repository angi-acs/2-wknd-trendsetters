/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cards17)'];

  // Each direct child div is a card, each with an <img>
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [];

  cardDivs.forEach(cardDiv => {
    const img = cardDiv.querySelector('img');
    // Only add row if an image exists
    if (img) {
      // For this HTML, there is no text content per card, so second cell is blank
      rows.push([img, '']);
    }
  });

  // Compose table and replace original element
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}