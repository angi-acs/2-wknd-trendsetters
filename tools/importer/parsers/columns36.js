/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches exactly
  const headerRow = ['Columns (columns36)'];

  // Find the main grid containing the columns
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get immediate children (left: text/buttons, right: images)
  const columns = Array.from(mainGrid.children);
  if (columns.length < 2) return;

  // --- LEFT COLUMN ---
  const leftCol = columns[0];
  // Collect all relevant content from leftCol
  // Find main heading, subheading, button group (if present)
  const leftContent = [];
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  const btnGrp = leftCol.querySelector('.button-group');
  if (btnGrp) leftContent.push(btnGrp);

  // --- RIGHT COLUMN ---
  const rightCol = columns[1];
  // Find image grid inside rightCol
  const imageGrid = rightCol.querySelector('.grid-layout');
  let rightContent = [];
  if (imageGrid) {
    // Get all images inside imageGrid
    const imgs = Array.from(imageGrid.querySelectorAll('img'));
    rightContent = imgs;
  }

  // Compose table data: only a single block table, two columns in second row
  const cells = [
    headerRow,
    [leftContent, rightContent]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
