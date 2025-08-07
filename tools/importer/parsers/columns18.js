/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid inside the container - this holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // The expected structure from the HTML:
  // gridChildren[0] = left content (headings and paragraph)
  // gridChildren[1] = ul contact list
  // gridChildren[2] = image

  // But let's find these explicitly, in case order changes
  let contentDiv = null;
  let contactList = null;
  let image = null;
  gridChildren.forEach(child => {
    if (child.tagName === 'DIV' && !contentDiv) {
      contentDiv = child;
    } else if (child.tagName === 'UL' && !contactList) {
      contactList = child;
    } else if (child.tagName === 'IMG' && !image) {
      image = child;
    }
  });

  // For the left column, combine the heading content and the contact list
  const leftColContent = [];
  if (contentDiv) {
    leftColContent.push(contentDiv);
  }
  if (contactList) {
    leftColContent.push(contactList);
  }

  // The right column is just the image
  const rightColContent = image;

  // Only build the row if we have at least something in left or right
  if (leftColContent.length === 0 && !rightColContent) return;

  const headerRow = ['Columns (columns18)'];
  const row = [leftColContent, rightColContent];

  const cells = [headerRow, row];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
