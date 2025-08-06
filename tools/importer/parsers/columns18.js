/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Extract the left content (heading, subheading, description)
  const contentDiv = children.find(el => el.querySelector('h2') && el.querySelector('h3'));
  let leftContent = [];
  if (contentDiv) {
    leftContent = Array.from(contentDiv.childNodes).filter(
      node => !(node.nodeType === Node.TEXT_NODE && !node.textContent.trim())
    );
  }

  // Extract the right content (contact list)
  const contactList = children.find(el => el.tagName === 'UL');
  let rightContent = [];
  if (contactList) {
    rightContent.push(contactList);
  }

  // Extract the image if present
  const image = children.find(el => el.tagName === 'IMG');

  // Compose the table: header is always one cell, content rows may be multiple columns
  const cells = [];
  cells.push(['Columns (columns18)']); // header row: exactly one cell
  cells.push([leftContent, rightContent]); // row 2: two columns
  if (image) {
    cells.push([image, '']); // row 3: two columns, image in left cell, right cell empty
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}