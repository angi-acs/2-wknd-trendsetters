/* global WebImporter */
export default function parse(element, { document }) {
  // Block header, matching example exactly
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];
  // Each card is an <a> direct child
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach((card) => {
    // Get card image (first img inside first child div)
    const imgDiv = card.querySelector('div.utility-aspect-2x3');
    let img = null;
    if (imgDiv) {
      img = imgDiv.querySelector('img');
    }
    // Compose text cell
    // For this block, we want to reference the full content as a single cell,
    // preserving headings and inline elements, and not clone or create elements unnecessarily
    // We'll create a wrapper div and move children in order
    const textCell = document.createElement('div');
    // Tag/date row
    const tagDate = card.querySelector('.flex-horizontal');
    if (tagDate) {
      // Use reference, not clone
      textCell.appendChild(tagDate);
    }
    // Heading
    const heading = card.querySelector('h3');
    if (heading) {
      textCell.appendChild(heading);
    }
    rows.push([
      img ? img : '',
      textCell
    ]);
  });
  // Build table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
