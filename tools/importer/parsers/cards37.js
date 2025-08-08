/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: extract image (first img descendant of a given card)
  function getCardImage(card) {
    // Look for image in .utility-aspect-2x3 or .utility-aspect-1x1, fallback to first img
    let imgWrap = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    if (imgWrap && imgWrap.querySelector('img')) return imgWrap.querySelector('img');
    if (card.querySelector('img')) return card.querySelector('img');
    return '';
  }
  // Helper: extract text content
  function getCardText(card) {
    // Text usually within .utility-padding-all-2rem, or direct children
    let textContainer = card.querySelector('.utility-padding-all-2rem');
    let nodes = [];
    if (textContainer) {
      // Grab all children except empty text nodes
      nodes = Array.from(textContainer.childNodes).filter(node => {
        if (node.nodeType === 3) return node.textContent.trim() !== '';
        return true;
      });
    } else {
      // Fallback: collect all headings, paragraphs, and .button directly under card
      ['h2','h3','h4','h5','p','.button'].forEach(sel => {
        card.querySelectorAll(sel).forEach(node => {
          if (!nodes.includes(node)) nodes.push(node);
        });
      });
    }
    return nodes.length === 1 ? nodes[0] : nodes;
  }

  // Find all card blocks (direct children of the 2 grid-layouts)
  // The outermost .grid-layout contains one big left card and one right grid
  // We want to preserve the order visually (big card, then the others in order)
  let mainContainer = element.querySelector('.container');
  if (!mainContainer) return;
  let mainGrid = mainContainer.querySelector('.grid-layout');
  if (!mainGrid) return;

  // First card is direct child anchor, second is grid (which contains remaining cards)
  let mainCards = [];
  Array.from(mainGrid.children).forEach(child => {
    if (child.classList.contains('utility-link-content-block')) {
      mainCards.push(child);
    } else if (child.classList.contains('grid-layout')) {
      // Nested grid: push each card
      Array.from(child.children).forEach(card => {
        if (card.classList.contains('utility-link-content-block')) {
          mainCards.push(card);
        }
      });
    }
  });

  // Compose rows: [image, textblock]
  const rows = mainCards.map(card => [
    getCardImage(card),
    getCardText(card)
  ]);

  // Table: Header, then per-card rows
  const table = WebImporter.DOMUtils.createTable([
    ['Cards (cards37)'],
    ...rows
  ], document);

  // Replace element
  element.replaceWith(table);
}
