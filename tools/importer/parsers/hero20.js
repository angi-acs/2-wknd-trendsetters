/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Hero (hero20)'];

  // --- Background images row ---
  // Get all images from the collage grid
  let backgroundImagesRow = [''];
  const scaleDiv = element.querySelector('.ix-hero-scale-3x-to-1x');
  if (scaleDiv) {
    const grid = scaleDiv.querySelector('.grid-layout');
    if (grid) {
      // All direct children .utility-position-relative > img
      const imgDivs = grid.querySelectorAll(':scope > .utility-position-relative');
      const images = [];
      imgDivs.forEach(div => {
        const img = div.querySelector('img');
        if (img) images.push(img);
      });
      if (images.length) {
        backgroundImagesRow = [images];
      }
    }
  }

  // --- Content row ---
  // Title, subheading, CTAs
  let contentRow = [''];
  const contentDiv = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentDiv) {
    // Preserve order from the DOM: h1, subheading, buttons
    const contentElements = [];
    const h1 = contentDiv.querySelector('h1');
    if (h1) contentElements.push(h1);
    const subheading = contentDiv.querySelector('p.subheading');
    if (subheading) contentElements.push(subheading);
    const btnGroup = contentDiv.querySelector('.button-group');
    if (btnGroup) contentElements.push(btnGroup);
    if (contentElements.length) {
      contentRow = [contentElements];
    }
  }

  // Compose the table data array
  const cells = [
    headerRow,
    backgroundImagesRow,
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the block table
  element.replaceWith(block);
}
