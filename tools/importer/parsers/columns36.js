/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row for the columns block (exact header per spec)
  const headerRow = ['Columns (columns36)'];

  // 2. Get the .grid-layout inside .container (the main columns wrapper)
  const mainGrid = element.querySelector('.container > .grid-layout');
  if (!mainGrid) return; // Defensive: only process if the structure matches
  const cols = Array.from(mainGrid.children);
  if (cols.length < 2) return; // Defensive: need at least two columns

  // 3. First column: left text & buttons. Reference the direct child.
  const leftCol = cols[0];
  // Compose content by referencing H1, subheading, and button group
  const leftFragments = [];
  const h1 = leftCol.querySelector('h1');
  if (h1) leftFragments.push(h1);
  const subheading = leftCol.querySelector('p');
  if (subheading) leftFragments.push(subheading);
  const btnGroup = leftCol.querySelector('.button-group');
  if (btnGroup) leftFragments.push(btnGroup);

  // 4. Second column: right images (reference direct children only)
  const rightCol = cols[1];
  // The images are always in a grid-layout inside this column
  // Defensive: look for grid-layout, else fallback to images directly
  let imgGrid = rightCol.querySelector('.grid-layout');
  let imgs = [];
  if (imgGrid) {
    imgs = Array.from(imgGrid.querySelectorAll('img'));
  } else {
    imgs = Array.from(rightCol.querySelectorAll('img'));
  }
  // Place all images in a div for grouping (preserve layout)
  const imgDiv = document.createElement('div');
  imgs.forEach(img => imgDiv.appendChild(img));

  // 5. Compose the table rows
  // The second row must have exactly two columns, each referencing the extracted DOM fragments
  const secondRow = [leftFragments, imgDiv];

  // 6. Compose the table data
  const cells = [headerRow, secondRow];

  // 7. Create block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
