/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row, as required.
  const headerRow = ['Cards (cards25)'];
  // Each card is a direct child div of the grid container.
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [headerRow];

  cardDivs.forEach(card => {
    // Find the first image (mandatory for every card)
    const img = card.querySelector('img');
    // Find potential text content: look for h3 and p inside nested divs
    let textContentCell = '';
    // Find a content wrapper (utility-padding-all-2rem), typically inside .utility-position-relative
    const contentWrapper = card.querySelector('.utility-padding-all-2rem');
    if (contentWrapper) {
      // Put all content in a fragment, preserving structure and semantic meaning
      const frag = document.createDocumentFragment();
      // Heading (h3) if present
      const heading = contentWrapper.querySelector('h3');
      if (heading) frag.appendChild(heading);
      // Description (p) if present
      const desc = contentWrapper.querySelector('p');
      if (desc) frag.appendChild(desc);
      textContentCell = frag.childNodes.length ? frag : '';
    }
    // For cards with only an image (no text), second cell is blank
    rows.push([
      img,
      textContentCell
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
