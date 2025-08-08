/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) header row
  const headerRow = ['Cards (cards10)'];

  // Get all cards (each card is an <a> child of the block element)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cardLinks.map(card => {
    // First cell: image
    let img = null;
    // The image is inside the first <div> inside each card
    const imgDiv = card.querySelector(':scope > div');
    if (imgDiv) {
      img = imgDiv.querySelector('img');
    }

    // Second cell: tag (if present), heading, description
    const textDiv = card.querySelector('.utility-padding-all-1rem');
    let textCellContent = [];
    if (textDiv) {
      // Tag (optional)
      const tag = textDiv.querySelector('.tag');
      if (tag) {
        textCellContent.push(tag);
      }
      // Heading (mandatory)
      const heading = textDiv.querySelector('h3, .h4-heading');
      if (heading) {
        textCellContent.push(heading);
      }
      // Description (mandatory)
      const desc = textDiv.querySelector('p');
      if (desc) {
        textCellContent.push(desc);
      }
    }
    return [img, textCellContent];
  });

  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
