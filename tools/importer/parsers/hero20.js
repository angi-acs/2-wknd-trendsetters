/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all relevant images in the background grid
  const gridLayout = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  let backgroundImages = [];
  if (gridLayout) {
    backgroundImages = Array.from(gridLayout.querySelectorAll('img'));
  }
  // Compose a div to group all images as the background collage
  const bgFragment = document.createElement('div');
  backgroundImages.forEach(img => bgFragment.appendChild(img));

  // Get the main content area (headline, subheading, CTAs)
  let contentDiv = element.querySelector('.ix-hero-scale-3x-to-1x-content .container, .container.small-container');
  const contentElems = [];
  if (contentDiv) {
    // Headline
    const heading = contentDiv.querySelector('h1, h2, h3');
    if (heading) contentElems.push(heading);
    // Subheading (first <p>)
    const subheading = contentDiv.querySelector('p');
    if (subheading) contentElems.push(subheading);
    // CTA buttons
    const btns = contentDiv.querySelectorAll('.button-group a, .button-group .w-button');
    if (btns && btns.length) {
      // If multiple buttons, group them in a div
      const btnDiv = document.createElement('div');
      btns.forEach(btn => btnDiv.appendChild(btn));
      contentElems.push(btnDiv);
    }
  }

  // Compose the table as specified: 1 column, 3 rows
  const cells = [
    ['Hero (hero20)'],
    [bgFragment],
    [contentElems]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
