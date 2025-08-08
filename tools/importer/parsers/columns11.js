/* global WebImporter */
export default function parse(element, { document }) {
  // Define header row exactly as in example
  const headerRow = ['Columns (columns11)'];

  // MAIN ROW extraction
  // Left column: intro content block
  let leftCol = null;
  let rightCol = null;

  // Find the main grid (the intro and author side)
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  if (mainGrid) {
    const cols = mainGrid.children;
    if (cols.length >= 2) {
      const leftColContainer = document.createElement('div');
      // Add eyebrow and heading
      Array.from(cols[0].children).forEach(child => {
        leftColContainer.appendChild(child);
      });
      // Add description
      const desc = cols[1].querySelector('.rich-text, .w-richtext');
      if (desc) leftColContainer.appendChild(desc);
      // Add author block, includes avatar, name/date/read-time
      const authorRow = cols[1].querySelector('.grid-layout');
      if (authorRow) leftColContainer.appendChild(authorRow);
      // Add button (Read more)
      const btn = cols[1].querySelector('.button, .w-button');
      if (btn) leftColContainer.appendChild(btn);
      leftCol = leftColContainer;
    }
  }

  // Right column: images block
  const imageGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  if (imageGrid) {
    const rightColContainer = document.createElement('div');
    Array.from(imageGrid.querySelectorAll('img')).forEach(img => {
      rightColContainer.appendChild(img);
    });
    rightCol = rightColContainer;
  }

  // Compose rows for table (must be 2 columns, like example)
  const cells = [
    headerRow,
    [leftCol, rightCol]
  ];

  // Create block table and replace original
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
