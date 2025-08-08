/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per example
  const rows = [['Cards (cards10)']];

  // Get all direct card-link children (cards)
  const cards = element.querySelectorAll(':scope > a.card-link');
  cards.forEach(card => {
    // Image cell
    let img = null;
    // The image is within a utility-aspect-3x2 div inside the card
    const imgDiv = card.querySelector('.utility-aspect-3x2');
    if (imgDiv) {
      img = imgDiv.querySelector('img');
    }

    // Text cell content
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    const textContent = [];
    if (textContainer) {
      // Tag (optional)
      const tag = textContainer.querySelector('.tag');
      if (tag) {
        textContent.push(tag);
      }
      // Heading (optional)
      const heading = textContainer.querySelector('h3');
      if (heading) {
        textContent.push(heading);
      }
      // Description (optional)
      const desc = textContainer.querySelector('p');
      if (desc) {
        textContent.push(desc);
      }
    }
    // Push row for this card
    rows.push([img, textContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
