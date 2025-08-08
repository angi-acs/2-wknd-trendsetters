/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row exactly as required
  const headerRow = ['Hero (hero28)'];

  // 2. Extract background image: usually one prominent img inside a parallax/hero wrapper
  let bgImg = element.querySelector('.ix-parallax-scale-out-hero img');
  let bgImgRow;
  if (bgImg) {
    bgImgRow = [bgImg];
  } else {
    bgImgRow = ['']; // empty if no image
  }

  // 3. Extract headline and sub-elements (title, subheading, CTA)
  // The heading is an h1 inside .utility-margin-bottom-6rem
  let contentCellElements = [];
  let container = element.querySelector('.container');
  if (container) {
    // Find the heading
    let headingWrapper = container.querySelector('.utility-margin-bottom-6rem');
    if (headingWrapper) {
      // Get all direct children of headingWrapper
      headingWrapper.childNodes.forEach(node => {
        // Only append Element nodes (h1, button group, etc)
        if (node.nodeType === Node.ELEMENT_NODE) {
          // For the button group, only append its children (likely links or buttons)
          if (node.classList.contains('button-group')) {
            node.childNodes.forEach(btnNode => {
              if (btnNode.nodeType === Node.ELEMENT_NODE) contentCellElements.push(btnNode);
            });
          } else {
            contentCellElements.push(node);
          }
        }
      });
    }
  }
  // If no content found, ensure empty cell
  if (contentCellElements.length === 0) {
    contentCellElements = [''];
  }
  let contentRow = [contentCellElements.length === 1 ? contentCellElements[0] : contentCellElements];

  // 4. Compose final table
  const cells = [
    headerRow,
    bgImgRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
