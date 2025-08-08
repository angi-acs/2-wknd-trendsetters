/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children of the grid
  const columns = Array.from(grid.children);

  // Variables for expected sections
  let leftContent = null;
  let rightContent = null;

  // From HTML: first content (h2/h3/p), then ul (contacts), then img
  // We'll combine h2/h3/p and ul for left column, img for right column

  // Find the info content (headings and paragraph)
  const infoBlock = columns.find(col => col.querySelector('h2, h3, p'));
  // Find ul contact list
  const contactUl = columns.find(col => col.tagName === 'UL');
  // Find image
  const imgBlock = columns.find(col => col.tagName === 'IMG');

  // Compose left column: info content + contact list
  if (infoBlock && contactUl) {
    const leftDiv = document.createElement('div');
    leftDiv.appendChild(infoBlock);
    leftDiv.appendChild(contactUl);
    leftContent = leftDiv;
  } else if (infoBlock) {
    leftContent = infoBlock;
  } else if (contactUl) {
    leftContent = contactUl;
  }

  // Compose right column: image if present
  if (imgBlock) {
    rightContent = imgBlock;
  }

  // Table cells array: header, second row with 2 cols as in example
  const cells = [
    ['Columns (columns18)'],
    [leftContent, rightContent]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
