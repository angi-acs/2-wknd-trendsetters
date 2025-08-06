/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as required
  const headerRow = ['Hero (hero12)'];

  // --- Row 2: Background Image ---
  // Find background image: .cover-image.utility-position-absolute
  let bgImg = null;
  const bgImgEl = element.querySelector('img.cover-image.utility-position-absolute');
  if (bgImgEl) bgImg = bgImgEl;

  // --- Row 3: Content ---
  // Get the card body content which contains the main block content
  let mainContent = null;
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    mainContent = cardBody;
  } else {
    // Fallback: get the first heading and any siblings if layout is unexpected
    const contentContainer = element.querySelector('h2')?.parentElement;
    if (contentContainer) {
      mainContent = contentContainer;
    } else {
      mainContent = element;
    }
  }

  // Build the table data array as per spec
  const cells = [
    headerRow,
    [bgImg],
    [mainContent]
  ];

  // Create block table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
