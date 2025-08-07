/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards10)'];
  const cardLinks = element.querySelectorAll(':scope > a');
  const rows = [headerRow];
  cardLinks.forEach((card) => {
    // Get image: first descendant with class 'card-image'
    const img = card.querySelector('.card-image');
    // Get text content: div.utility-padding-all-1rem (contains tags, heading, and paragraph)
    const textContent = card.querySelector('.utility-padding-all-1rem');
    // Only add if both are present
    if (img && textContent) {
      rows.push([img, textContent]);
    } else if (img) {
      rows.push([img, '']);
    } else if (textContent) {
      rows.push(['', textContent]);
    }
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
