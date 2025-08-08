/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header
  const headerRow = ['Hero (hero20)'];

  // 2. Extract background image(s)
  // The actual visual collage is made of images inside the grid-layout within the first .ix-hero-scale-3x-to-1x
  const collageRoot = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
  let collageCell = [''];
  if (collageRoot) {
    // Get all images in the collage
    const collageImgs = Array.from(collageRoot.querySelectorAll('img'));
    if (collageImgs.length > 0) {
      const collageDiv = document.createElement('div');
      collageImgs.forEach(img => collageDiv.appendChild(img));
      collageCell = [collageDiv];
    }
  }
  // 3. Extract hero content: headline, subheading, CTA(s)
  // .ix-hero-scale-3x-to-1x-content .container contains the content
  const contentRoot = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentCell = [''];
  if (contentRoot) {
    const contentParts = [];
    // Headline
    const h1 = contentRoot.querySelector('h1');
    if (h1) contentParts.push(h1);
    // Subheading (typically a <p>)
    const subheading = contentRoot.querySelector('p');
    if (subheading) contentParts.push(subheading);
    // CTA buttons
    const buttonGroup = contentRoot.querySelector('.button-group');
    if (buttonGroup) contentParts.push(buttonGroup);
    contentCell = [contentParts];
  }

  // 4. Construct table
  const cells = [
    headerRow,    // Block name header
    collageCell,  // Images collage
    contentCell   // Text & CTA
  ];

  // 5. Replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
