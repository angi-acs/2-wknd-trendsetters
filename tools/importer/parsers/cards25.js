/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const cells = [['Cards (cards25)']];

  // For each direct child (potential card) of the grid container
  const children = Array.from(element.querySelectorAll(':scope > div'));

  children.forEach((cardEl) => {
    // Always get the img for first cell of the row (the card image)
    const img = cardEl.querySelector('img');
    if (!img) return; // Only process items with an image, per block definition

    // Find the most relevant text content (usually in .utility-padding-all-2rem)
    let textCell = '';
    let textSource = cardEl.querySelector('.utility-padding-all-2rem');
    if (!textSource) {
      // Sometimes there is no such div, try .utility-position-relative
      textSource = cardEl.querySelector('.utility-position-relative');
    }
    if (!textSource) {
      // Fallback to the cardEl itself
      textSource = cardEl;
    }

    // Extract heading and description, reference actual elements (not clone)
    const h3 = textSource.querySelector('h3');
    const p = textSource.querySelector('p');
    if (h3 || p) {
      const frag = document.createDocumentFragment();
      if (h3) frag.appendChild(h3);
      if (p) frag.appendChild(p);
      textCell = frag.childNodes.length ? frag : '';
    }
    // If no heading or paragraph was found, just leave text cell blank

    // Add the card row to the table
    cells.push([img, textCell]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
