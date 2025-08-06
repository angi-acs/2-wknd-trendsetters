/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header must match exactly
  const headerRow = ['Hero (hero6)'];

  // 2. Extract the background image (row 2)
  // Find first image in the first top-level grid column
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  if (gridDivs.length > 0) {
    bgImg = gridDivs[0].querySelector('img');
  }

  // 3. Extract text block (row 3): title, subheading, ctas
  let textBlock = null;
  if (gridDivs.length > 1) {
    // look for the card inside the second grid column
    textBlock = gridDivs[1].querySelector('.card');
  }

  // 4. Build the table rows, referencing real elements
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [textBlock ? textBlock : '']
  ];

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
