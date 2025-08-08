/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Each card is an <a> inside the grid
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach(card => {
    // --- Image/Icon (first column) ---
    // Find first <img> inside card (usually in the first div)
    const imgContainer = card.querySelector('.utility-aspect-2x3');
    let imgEl = null;
    if (imgContainer) {
      imgEl = imgContainer.querySelector('img');
    } else {
      imgEl = card.querySelector('img');
    }
    // --- Text content (second column) ---
    // Compose a fragment for tag/date + heading
    const textFrag = document.createElement('div');
    // Top row: tag and date (inside .flex-horizontal)
    const meta = card.querySelector('.flex-horizontal');
    if (meta) {
      // Use reference, not clone
      textFrag.appendChild(meta);
    }
    // Heading
    const heading = card.querySelector('h3, h4, h2, h1');
    if (heading) {
      textFrag.appendChild(heading);
    }
    rows.push([
      imgEl ? imgEl : '',
      textFrag
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
