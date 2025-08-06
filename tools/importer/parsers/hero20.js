/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches example
  const headerRow = ['Hero (hero20)'];

  // Background images: find the main collage div and collect all images
  let bgDiv = null;
  const gridImagesContainer = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  if (gridImagesContainer) {
    const imgs = Array.from(gridImagesContainer.querySelectorAll('img'));
    if (imgs.length) {
      bgDiv = document.createElement('div');
      imgs.forEach(img => bgDiv.appendChild(img));
    }
  }

  // Content: find text and buttons
  let contentArr = [];
  const contentWrapper = element.querySelector(
    '.ix-hero-scale-3x-to-1x-content .container'
  );
  if (contentWrapper) {
    // Heading (h1)
    const h1 = contentWrapper.querySelector('h1');
    if (h1) contentArr.push(h1);
    // Subheading (first p)
    const subheading = contentWrapper.querySelector('p');
    if (subheading) contentArr.push(subheading);
    // Call-to-actions: collect all <a> in .button-group
    const btnGroup = contentWrapper.querySelector('.button-group');
    if (btnGroup) {
      const ctas = Array.from(btnGroup.querySelectorAll('a'));
      if (ctas.length) contentArr.push(...ctas);
    }
  }

  // If no content, make the cell empty for resilience
  if (contentArr.length === 0) contentArr = [''];

  // Table assembly: 1 column, 3 rows
  const rows = [
    headerRow,
    [bgDiv],
    [contentArr]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
