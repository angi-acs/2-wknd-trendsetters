/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Set up header row
  const headerRow = ['Hero (hero20)'];

  // 2. Extract background images (all direct <img> in the collage grid)
  let backgroundCell = '';
  const collageGrid = element.querySelector('.desktop-3-column');
  if (collageGrid) {
    // Use a div to hold all images together
    const imgContainer = document.createElement('div');
    // Only add <img> elements, which exist in the grid
    collageGrid.querySelectorAll('img').forEach(img => imgContainer.appendChild(img));
    backgroundCell = imgContainer.childNodes.length ? imgContainer : '';
  }

  // 3. Extract hero content (headline, subheading, buttons) from content container
  let contentCell = '';
  const contentSection = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentSection) {
    const cellContents = [];
    // Headline (h1)
    const headline = contentSection.querySelector('h1');
    if (headline) cellContents.push(headline);
    // Subheading (p)
    const subheading = contentSection.querySelector('p');
    if (subheading) cellContents.push(subheading);
    // Call-to-action buttons (a)
    const buttonGroup = contentSection.querySelector('.button-group');
    if (buttonGroup) {
      buttonGroup.querySelectorAll('a').forEach(btn => cellContents.push(btn));
    }
    contentCell = cellContents.length ? cellContents : '';
  }

  // 4. Create table
  const cells = [
    headerRow,
    [backgroundCell],
    [contentCell]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the element with the new block table
  element.replaceWith(block);
}
