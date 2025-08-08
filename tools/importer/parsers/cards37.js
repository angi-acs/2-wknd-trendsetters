/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as specified
  const headerRow = ['Cards (cards37)'];

  // Find main grid containing the cards
  const mainGrid = element.querySelector('.container > .grid-layout');
  if (!mainGrid) return;

  // Helper: extract card data from a card <a> element
  function extractCard(cardElem) {
    // Find the image (mandatory)
    const img = cardElem.querySelector('img');

    // Find the text content container
    // Sometimes it's wrapped in .utility-padding-all-2rem, otherwise direct children
    let textContainer = cardElem.querySelector('.utility-padding-all-2rem') || cardElem;

    // Heading (use h3 or h4)
    const heading = textContainer.querySelector('h3, h4');
    // Description (first <p> after heading, or first <p> if heading is missing)
    let desc = null;
    if (heading) {
      let next = heading.nextElementSibling;
      if (next && next.tagName.toLowerCase() === 'p') {
        desc = next;
      }
    } else {
      desc = textContainer.querySelector('p');
    }
    // Call to action (CTA): .button or <a> that's not the top card link
    let cta = null;
    // Only search in textContainer for .button or a sub-anchor (not top-level)
    const btn = textContainer.querySelector('.button');
    if (btn) cta = btn;
    // If not found, try <a> not at the top level
    if (!cta) {
      const btnLink = Array.from(textContainer.querySelectorAll('a')).find(a => a !== cardElem);
      if (btnLink) cta = btnLink;
    }

    // Compose the right cell in order: heading, description, cta
    const rightCell = [];
    if (heading) rightCell.push(heading);
    if (desc) rightCell.push(desc);
    if (cta) rightCell.push(cta);
    return [img, rightCell];
  }

  // Gather all cards
  const cardRows = [];
  // The mainGrid has two direct children: the left big card (an <a>), and right column grid
  const children = Array.from(mainGrid.children);
  if (children.length < 2) return;

  // Left (first) card is a single <a>
  const leftCard = children[0];
  if (leftCard.tagName.toLowerCase() === 'a') {
    cardRows.push(extractCard(leftCard));
  }

  // Right column: a grid of 4 <a> cards inside another .grid-layout
  const rightGrid = children[1];
  if (rightGrid && rightGrid.classList.contains('grid-layout')) {
    const rightCards = rightGrid.querySelectorAll(':scope > a');
    rightCards.forEach(card => {
      cardRows.push(extractCard(card));
    });
  }

  // Create the table
  const cells = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
