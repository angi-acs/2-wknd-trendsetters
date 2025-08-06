/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: block name and variant
  const headerRow = ['Cards (cards25)'];
  const cells = [headerRow];

  // Get all immediate child divs (each representing a potential card)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach(card => {
    // Get the image (first img in this card div)
    const img = card.querySelector('img');
    
    // For text: try to find the deepest text content block that likely contains heading + description
    // Many cards have a '.utility-padding-all-2rem' or similar inner wrapper
    let textWrapper = card.querySelector('.utility-padding-all-2rem');
    if (!textWrapper) {
      // Fallback: find the first heading or paragraph inside the card
      textWrapper = document.createElement('div');
      const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
      const paragraphs = card.querySelectorAll('p');
      if (heading) textWrapper.appendChild(heading);
      paragraphs.forEach(p => textWrapper.appendChild(p));
    }
    // Check if textWrapper actually contains content
    const hasText = textWrapper && textWrapper.textContent.trim().length > 0;
    
    // Compose the row: always 2 columns (img, text)
    cells.push([
      img || '',
      hasText ? textWrapper : ''
    ]);
  });

  // Create and insert the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
