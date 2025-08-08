/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name exactly as specified
  const headerRow = ['Hero (hero6)'];

  // 2. Second row: background image (img element, if present)
  let bgImg = null;
  // Find the background image by searching for a direct descendant img in the first grid cell
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 0) {
    // Typically background image is in the first grid cell
    const possibleImg = gridDivs[0].querySelector('img');
    if (possibleImg) bgImg = possibleImg;
  }

  // 3. Third row: headline, subheading, and CTA (all content card)
  let cardContent = null;
  // Card is nested inside the second grid column
  if (gridDivs.length > 1) {
    const card = gridDivs[1].querySelector('.card');
    if (card) cardContent = card;
  }

  // Compose table rows
  // If background image or content is missing, provide empty string to maintain rows
  const rows = [
    headerRow,
    [bgImg || ''],
    [cardContent || '']
  ];

  // Create table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
