/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const cells = [['Cards (cards33)']];

  // Get all card anchor elements (each card is an <a> block)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  cardLinks.forEach((card) => {
    // First cell: image (must be referenced, not cloned)
    const img = card.querySelector('img');
    // Second cell: text content
    // Find the main inner content div (contains heading, text, etc)
    let textCell = null;
    const innerGrids = card.querySelectorAll('.w-layout-grid');
    for (const grid of innerGrids) {
      if (grid.querySelector('h3')) {
        textCell = grid;
        break;
      }
    }
    if (!textCell) textCell = card;

    const textElems = [];
    // Tag and read time (may or may not be present)
    const tagTimeRow = textCell.querySelector('.flex-horizontal');
    if (tagTimeRow) {
      Array.from(tagTimeRow.children).forEach(child => {
        // Tag or read time divs
        textElems.push(child);
      });
    }
    // Heading
    const heading = textCell.querySelector('h3');
    if (heading) textElems.push(heading);
    // Description
    const desc = textCell.querySelector('p');
    if (desc) textElems.push(desc);
    // CTA (Read link)
    // Look for a div with text 'Read' that's not part of tag/time
    // Only include if it's not already included
    const divs = Array.from(textCell.querySelectorAll(':scope > div'));
    let foundRead = false;
    for (const div of divs) {
      if (div.textContent.trim() === 'Read' && !div.classList.contains('tag') && !div.classList.contains('flex-horizontal') && !div.classList.contains('paragraph-sm')) {
        textElems.push(div);
        foundRead = true;
        break;
      }
    }
    // Compose the row: [image, [text content]]
    cells.push([
      img || '',
      textElems.length ? textElems : ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
