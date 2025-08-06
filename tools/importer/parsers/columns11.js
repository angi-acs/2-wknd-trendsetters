/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const container = element.querySelector('.container');
  if (!container) return;

  // The first grid contains intro left and right
  const mainGrids = container.querySelectorAll('.w-layout-grid');
  let leftCol = document.createElement('div');
  let rightCol = document.createElement('div');

  // --- LEFT COLUMN: Headline, subheadline, paragraph, author, button ---
  // left block (eyebrow and h1)
  const leftBlock = mainGrids[0].children[0];
  if (leftBlock) {
    Array.from(leftBlock.children).forEach(child => leftCol.appendChild(child));
  }

  // right description block (paragraph, author, button)
  const rightBlock = mainGrids[0].children[1];
  if (rightBlock) {
    // Paragraph
    const richText = rightBlock.querySelector('.rich-text');
    if (richText) leftCol.appendChild(richText);
    // Author section and button
    const grid = rightBlock.querySelector('.w-layout-grid');
    if (grid) {
      // Author row
      const authorRow = grid.querySelector('.flex-horizontal.y-center');
      if (authorRow) leftCol.appendChild(authorRow);
      // Button (may be last child)
      const readMoreBtn = grid.querySelector('a');
      if (readMoreBtn) leftCol.appendChild(readMoreBtn);
    }
  }

  // --- RIGHT COLUMN: Two large images ---
  // The next grid is outside the container, inside section
  let imageGrid = null;
  let parent = element;
  // locate the image grid (mobile-portrait-1-column)
  imageGrid = parent.querySelector('.w-layout-grid.mobile-portrait-1-column');
  if (imageGrid) {
    const imgDivs = imageGrid.querySelectorAll('.utility-aspect-1x1');
    imgDivs.forEach(div => {
      const img = div.querySelector('img');
      if (img) rightCol.appendChild(img);
    });
  }

  // --- Compose the table as two columns, one row (plus header) ---
  const headerRow = ['Columns (columns11)'];
  const cells = [headerRow, [leftCol, rightCol]];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
