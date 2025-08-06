/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all card anchors in the block (both main card and side cards)
  const cardAnchors = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  const cells = [];
  // Header exactly as required
  cells.push(['Cards (cards37)']);

  cardAnchors.forEach(card => {
    // -------- IMAGE (Cell 1): --------
    // Find the first <img> in the card
    const img = card.querySelector('img');

    // -------- TEXT (Cell 2): --------
    const textContent = [];
    // The main card's text is in a div.utility-padding-all-2rem, others have headings/para directly
    const textDiv = card.querySelector('.utility-padding-all-2rem');
    if (textDiv) {
      // Add all its children (h2, p, .button, etc.) in order
      Array.from(textDiv.children).forEach(child => {
        textContent.push(child);
      });
    } else {
      // For other cards: h3/h4 and p directly under the anchor
      Array.from(card.children).forEach(child => {
        // Only include H3/H4 headings, paragraphs, and button (if present)
        if (
          /^H[2-4]$/.test(child.tagName) ||
          child.tagName === 'P' ||
          child.classList.contains('button')
        ) {
          textContent.push(child);
        }
      });
    }

    // Always output a cell for image and one for text slot
    cells.push([
      img || '',
      textContent.length > 0 ? textContent : ''
    ]);
  });

  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
