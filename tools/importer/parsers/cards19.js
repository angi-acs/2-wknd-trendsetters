/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as in the example
  const rows = [['Cards (cards19)']];

  // Get all immediate children representing cards
  const cards = element.querySelectorAll(':scope > div');
  
  cards.forEach(card => {
    // Find icon (svg) in a .icon div
    let iconDiv = card.querySelector('.icon');
    if (!iconDiv) {
      // fallback: first svg found
      const svg = card.querySelector('svg');
      if (svg) {
        iconDiv = document.createElement('div');
        iconDiv.className = 'icon';
        iconDiv.appendChild(svg);
      }
    }

    // Find the card's text (first p)
    let textContent = card.querySelector('p');
    if (!textContent) {
      // fallback: all non-icon text nodes
      const para = document.createElement('p');
      Array.from(card.childNodes).forEach(node => {
        if ((node.nodeType === Node.TEXT_NODE && node.textContent.trim()) || (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'DIV')) {
          para.append(node.cloneNode(true));
        }
      });
      if (para.textContent.trim()) {
        textContent = para;
      }
    }
    // Only add a row if both exist
    if (iconDiv && textContent) {
      rows.push([iconDiv, textContent]);
    }
  });

  // Create and replace block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
