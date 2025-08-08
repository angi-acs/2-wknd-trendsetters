/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards17) block - image + text support
  const headerRow = ['Cards (cards17)'];
  // Each direct child div is a card container
  const cardDivs = element.querySelectorAll(':scope > div');
  const rows = [];
  cardDivs.forEach((cardDiv) => {
    // Image extraction (first cell)
    let img = cardDiv.querySelector('img');
    // Try to extract text content (second cell)
    // Accepts any heading, paragraphs, links, or generic text
    let textContent = '';
    // Look for text elements that are siblings of the image, or inside the cardDiv
    const candidates = Array.from(cardDiv.childNodes).filter(node => {
      // Only accept element nodes that are not images
      return node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'IMG';
    });
    if (candidates.length > 0) {
      // If there are text elements, combine into a fragment
      const fragment = document.createDocumentFragment();
      candidates.forEach(el => fragment.appendChild(el));
      textContent = fragment;
    } else {
      // Check for stray text nodes
      const textNodes = Array.from(cardDiv.childNodes).filter(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      if (textNodes.length > 0) {
        const span = document.createElement('span');
        span.textContent = textNodes.map(n => n.textContent.trim()).join(' ');
        textContent = span;
      } else {
        textContent = '';
      }
    }
    rows.push([
      img || '',
      textContent
    ]);
  });
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
