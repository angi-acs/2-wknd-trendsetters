/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: check container
  const container = element.querySelector('.container');
  if (!container) return;
  // Find the grid
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // The left hero content (the large card)
  const leftHero = grid.children[0];

  // The right column content: consists of 2 vertical stacks
  // First vertical stack: two cards with image/tag/heading/desc
  // Second vertical stack: series of text cards each separated by divider
  const rightColParts = [];

  // First right column: the set of image cards
  if (grid.children.length > 1) {
    // This is a flex container of a set of 'a.utility-link-content-block' children
    const firstStack = grid.children[1];
    const cards = Array.from(firstStack.querySelectorAll(':scope > a.utility-link-content-block'));
    rightColParts.push(...cards);
  }

  // Second right column: vertical stack of text cards separated by dividers
  if (grid.children.length > 2) {
    const secondStack = grid.children[2];
    // Each card is an a.utility-link-content-block, each divider is a .divider
    // We want to add the cards in order, separated by divider if present
    const children = Array.from(secondStack.children);
    for (let i = 0; i < children.length; i++) {
      rightColParts.push(children[i]);
    }
  }

  // The table requires a header row of ['Columns (columns2)'].
  const headerRow = ['Columns (columns2)'];
  // The second row has 2 columns: left hero and right stack
  const columnsRow = [leftHero, rightColParts];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  element.replaceWith(table);
}
