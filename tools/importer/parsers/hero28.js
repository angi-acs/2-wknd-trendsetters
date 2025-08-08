/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero28)'];

  // Find the background image (first img inside .ix-parallax-scale-out-hero)
  let bgImg = null;
  const parallaxDiv = element.querySelector('.ix-parallax-scale-out-hero');
  if (parallaxDiv) {
    const imgEl = parallaxDiv.querySelector('img');
    if (imgEl) bgImg = imgEl;
  }

  // Find the content block with heading and CTA: .container .utility-margin-bottom-6rem
  let contentBlock = null;
  const gridDiv = element.querySelector('.w-layout-grid');
  if (gridDiv) {
    const contentContainer = gridDiv.querySelector('.container');
    if (contentContainer) {
      const marginDiv = contentContainer.querySelector('.utility-margin-bottom-6rem');
      if (marginDiv) {
        contentBlock = marginDiv;
      } else {
        // fallback: use the whole contentContainer
        contentBlock = contentContainer;
      }
    }
  }

  // Build the table: strictly 1 column 3 rows per spec
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentBlock ? contentBlock : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
