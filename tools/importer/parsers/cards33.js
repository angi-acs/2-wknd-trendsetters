/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as per spec
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Select all immediate child <a> elements (each is a card)
  const cardLinks = element.querySelectorAll(':scope > a');

  cardLinks.forEach(cardLink => {
    // Find the image inside the card (if any)
    const img = cardLink.querySelector('img');

    // Find the main content div after the image
    // In this HTML, it is the only <div> that is a sibling of the image
    let contentDiv = null;
    const outerGrid = cardLink.querySelector(':scope > div');
    if (outerGrid) {
      // Get all children of the grid
      const children = Array.from(outerGrid.children);
      // Remove the image from the children
      const nonImgChildren = children.filter(child => child !== img);
      // Wrap the non-image children into a div (preserve their structure and reference)
      contentDiv = document.createElement('div');
      nonImgChildren.forEach(child => contentDiv.appendChild(child));
    }
    // Fallback if contentDiv couldn't be found
    if (!contentDiv) {
      contentDiv = document.createElement('div');
    }
    // Each cards33 row: [image, content]
    rows.push([
      img || '',
      contentDiv
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
