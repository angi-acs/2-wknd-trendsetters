/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block name
  const headerRow = ['Cards (cards17)'];

  // Get all immediate child divs (each is a card)
  const cardDivs = element.querySelectorAll(':scope > div');

  // For each card div, extract the image (mandatory, present)
  // No text content is present in this HTML, so second cell is empty
  const rows = Array.from(cardDivs).map(cardDiv => {
    const img = cardDiv.querySelector('img');
    // Reference the existing img element directly
    return [img, ''];
  });

  // Compose table: header + card rows
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
