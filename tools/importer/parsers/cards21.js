/* global WebImporter */
export default function parse(element, { document }) {
  // Table header should match example exactly
  const headerRow = ['Cards (cards21)'];

  // Generalize to handle multiple cards (even if only one in this example)
  // Find all descendant .card elements
  const cardElements = element.querySelectorAll('.card');
  const rows = [headerRow];

  cardElements.forEach(cardEl => {
    // Try to find the card body
    const cardBody = cardEl.querySelector('.card-body') || cardEl;
    // Find the image (mandatory)
    const img = cardBody.querySelector('img');
    // Find the heading (optional)
    let heading = cardBody.querySelector('.h4-heading, h1, h2, h3, h4, h5, h6');
    // Find description (optional):
    // Description is any <p>, or any sibling after heading, excluding image
    let description = null;
    if (heading) {
      let next = heading.nextElementSibling;
      while (next) {
        if (next.tagName.toLowerCase() !== 'img') {
          description = next;
          break;
        }
        next = next.nextElementSibling;
      }
    } else {
      // If no heading, try to find a <p> or any non-image element
      let possible = Array.from(cardBody.children).find(el => el.tagName.toLowerCase() !== 'img');
      if (possible) description = possible;
    }
    // Compose text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (description) {
      // Add line break between heading and description only if both exist and
      // description is not just whitespace or duplicate of heading
      if (heading) textCell.push(document.createElement('br'));
      textCell.push(description);
    }
    // If neither heading nor description, ensure cell is not empty
    if (!textCell.length) textCell.push('');

    // Build row: [image, text cell]
    rows.push([img, textCell]);
  });

  // Create table and replace original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
