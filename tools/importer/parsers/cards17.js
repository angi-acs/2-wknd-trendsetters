/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards17)'];
  // Get all direct card containers
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  const rows = cards.map(cardDiv => {
    // First cell: image (first img found)
    const img = cardDiv.querySelector('img');
    // Second cell: gather any non-img content (future-proof for text, CTA, etc)
    const nonImgNodes = Array.from(cardDiv.childNodes).filter(node => {
      return !(node.nodeType === 1 && node.tagName.toLowerCase() === 'img');
    });
    // If no extra non-img nodes, return empty string; otherwise, use all as array
    let textCell = '';
    if (nonImgNodes.length > 0) {
      textCell = nonImgNodes;
    }
    return [img, textCell];
  });
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}