/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards19)'];

  // Get all immediate children representing cards
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  const rows = cardDivs.map(card => {
    // Icon cell - find div.icon or first svg
    let iconCell = null;
    const iconDiv = card.querySelector('.icon');
    if (iconDiv) {
      iconCell = iconDiv;
    } else {
      // fallback: find the first svg
      const svg = card.querySelector('svg');
      if (svg) {
        iconCell = svg;
      }
    }
    // Text cell - find p tag (description)
    let textCell = null;
    const p = card.querySelector('p');
    if (p) {
      textCell = p;
    } else {
      // fallback: find first text node or div after icon
      // Most likely, if no <p>, use everything except the iconDiv
      // But our HTML always has a <p>
      textCell = card;
    }
    // If iconCell or textCell are missing, use empty string (for edge-case resilience)
    return [iconCell || '', textCell || ''];
  });

  // Compose table cells: header, then card rows
  const tableCells = [headerRow, ...rows];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
