/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to collect all card anchor elements within grids, at any level
  function collectCards(grid) {
    const cards = [];
    Array.from(grid.children).forEach(child => {
      // If child is a card anchor
      if (child.matches && child.matches('a.utility-link-content-block')) {
        cards.push(child);
      } else if (child.matches && child.matches('div.w-layout-grid')) {
        // Recursively handle nested card grids
        collectCards(child).forEach(card => cards.push(card));
      }
    });
    return cards;
  }

  // Find top-level grid containing cards
  const container = element.querySelector('.w-layout-grid.grid-layout');
  if (!container) return; // Defensive: if no grid, exit
  const cards = collectCards(container);

  // Compose table rows
  const rows = [];
  rows.push(['Cards (cards37)']); // Table header as in example

  cards.forEach(card => {
    // Find first image in card
    const img = card.querySelector('img');
    // Find the container of textual content within the card
    let textContainer = card.querySelector('.utility-padding-all-2rem');
    if (!textContainer) {
      // If not present, collect the h3/h4, p, and .button elements
      const tc = document.createElement('div');
      Array.from(card.children).forEach(child => {
        if (
          (child.tagName === 'H3' || child.tagName === 'H4' || child.tagName === 'P') ||
          (child.classList && child.classList.contains('button'))
        ) {
          tc.appendChild(child);
        }
      });
      textContainer = tc;
    }
    // Row: [image, text]
    rows.push([
      img,
      textContainer
    ]);
  });

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
