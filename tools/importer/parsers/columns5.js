/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the two main columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  const children = Array.from(grid.children);
  // There should be two children: content (container grid), and image
  let leftContent = null;
  let rightImage = null;

  // Find the image: look for the first <img> under this grid
  rightImage = grid.querySelector('img');

  // The content grid is the first non-img child
  leftContent = children.find(child => child !== rightImage);
  if (!leftContent) return;

  // The actual content is probably in the first child of leftContent
  let contentBlock = leftContent;
  if (leftContent.children.length === 1) {
    contentBlock = leftContent.firstElementChild;
  }

  // Gather all elements: heading, paragraph, buttons (in order)
  const colParts = [];
  const h2 = contentBlock.querySelector('h2');
  if (h2) colParts.push(h2);
  // Grab the first rich text or paragraph block
  const richText = contentBlock.querySelector('.rich-text, .w-richtext, p');
  if (richText) colParts.push(richText);
  // Grab the button group
  const btnGroup = contentBlock.querySelector('.button-group');
  if (btnGroup) colParts.push(btnGroup);

  // Compose the table as a columns block
  const headerRow = ['Columns (columns5)'];
  const contentRow = [colParts, rightImage];
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
