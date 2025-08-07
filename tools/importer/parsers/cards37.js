/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const rows = [
    ['Cards (cards37)']
  ];

  // Find the grid that contains the cards
  let topGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!topGrid) topGrid = element;

  // Get all direct children (a or div) of the top grid
  let cards = [];
  topGrid.childNodes.forEach((child) => {
    if (child.nodeType === 1 && (child.matches('a.utility-link-content-block, .utility-link-content-block'))) {
      cards.push(child);
    } else if (child.nodeType === 1 && child.classList.contains('w-layout-grid')) {
      // Nested grid: get its direct card children
      child.querySelectorAll(':scope > a.utility-link-content-block, :scope > .utility-link-content-block').forEach(a => {
        cards.push(a);
      });
    }
  });

  cards.forEach((card) => {
    // First column: image (use the aspect ratio wrapper so any cropping/borders are preserved)
    let imgDiv = card.querySelector('div[class*="utility-aspect-"]');
    let imageCell = imgDiv || '';

    // Second column: all text content (heading, description, cta if present)
    let textCell = [];
    // Heading (displayed as h2 or h3 or h4)
    let heading = card.querySelector('h2, h3, h4');
    if (heading) textCell.push(heading);
    // Description (the first p after heading)
    let desc = card.querySelector('p');
    if (desc) textCell.push(desc);
    // CTA (button or .button, rarely present)
    let cta = card.querySelector('a.button, button, .button');
    if (cta) textCell.push(cta);

    rows.push([imageCell, textCell]);
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
