/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly
  const headerRow = ['Cards (cards19)'];

  // Get all card divs (each direct child is a card)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const rows = cardDivs.map(card => {
    // Icon cell: the .icon div (contains the SVG)
    const iconDiv = card.querySelector('.icon');
    // Text cell: the <p> element (contains all text)
    const p = card.querySelector('p');
    // Defensive: always put something in cells for robustness
    return [iconDiv || document.createElement('span'), p || document.createElement('span')];
  });

  // Assemble the table: header row, then one row per card
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
