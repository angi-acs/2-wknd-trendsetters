/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches example exactly
  const headerRow = ['Cards (cards19)'];
  // Collect all top-level direct card divs
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each card is 2 columns: icon (SVG) and text (paragraph)
  const rows = cardDivs.map(cardDiv => {
    // Cell 1: Icon/graphic
    // Look for an element with .icon and SVG inside
    let iconContainer = cardDiv.querySelector('.icon');
    let iconContent = null;
    if (iconContainer && iconContainer.firstElementChild) {
      iconContent = iconContainer; // Reference the div with SVG inside
    } else {
      // fallback: first SVG
      let svg = cardDiv.querySelector('svg');
      if (svg) iconContent = svg;
      else iconContent = '';
    }
    // Cell 2: Text content (paragraph)
    let p = cardDiv.querySelector('p');
    let textCell = p ? p : '';
    return [iconContent, textCell];
  });

  // Compose table for Cards (cards19)
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element with new table block
  element.replaceWith(block);
}
