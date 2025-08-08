/* global WebImporter */
export default function parse(element, { document }) {
  // Table header per the requirements
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Each direct child div is a card
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach(cardDiv => {
    // Find the image in the card
    const img = cardDiv.querySelector('img');

    // Flexible: Gather all non-image content for the text cell
    // Gather all elements except images
    const textContentElements = Array.from(cardDiv.childNodes)
      .filter(node => {
        // Exclude images
        if (node.nodeType === 1 && node.tagName.toLowerCase() === 'img') return false;
        // Exclude empty text nodes
        if (node.nodeType === 3 && !node.textContent.trim()) return false;
        return true;
      });

    let textCellContent;
    if (textContentElements.length > 0) {
      // If there is actual content, use it all
      textCellContent = textContentElements;
    } else if (img && img.alt && img.alt.trim()) {
      // Fallback: Use alt text as a <strong> if present
      const strong = document.createElement('strong');
      strong.textContent = img.alt;
      textCellContent = strong;
    } else {
      // No text at all
      textCellContent = '';
    }

    rows.push([
      img,
      textCellContent
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}