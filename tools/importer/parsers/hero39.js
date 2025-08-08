/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero39)'];

  // Find all direct children of the main grid layout
  const gridDivs = element.querySelectorAll(':scope > div > div');

  // --- Row 2: Background Image (optional) ---
  let bgImage = null;
  if (gridDivs.length > 0) {
    bgImage = gridDivs[0].querySelector('img');
  }

  // --- Row 3: Content (heading, paragraph, button) ---
  let contentCell = null;
  if (gridDivs.length > 1) {
    // The content grid (text, button) is inside the second gridDiv
    const contentGrid = gridDivs[1].querySelector('.w-layout-grid');
    if (contentGrid) {
      // Collect heading, paragraph, button
      const heading = contentGrid.querySelector('h1');

      // Find flex container for paragraph and button
      const flexVertical = contentGrid.querySelector('.flex-vertical');
      let paragraph = null, buttonGroup = null;
      if (flexVertical) {
        paragraph = flexVertical.querySelector('p');
        buttonGroup = flexVertical.querySelector('.button-group');
      }

      // Compose the cell content
      const contentArr = [];
      if (heading) contentArr.push(heading);
      if (paragraph) contentArr.push(paragraph);
      if (buttonGroup) contentArr.push(buttonGroup);

      // Place all content in a div for a single cell
      contentCell = document.createElement('div');
      contentArr.forEach(node => contentCell.appendChild(node));
    }
  }

  // Table structure: [header], [background image], [content]
  const rows = [
    headerRow,
    [bgImage ? bgImage : ''],
    [contentCell ? contentCell : ''],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
