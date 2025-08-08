/* global WebImporter */
export default function parse(element, { document }) {
  // Header row from spec
  const headerRow = ['Columns (columns18)'];
  
  // Find the grid layout
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // The grid contains 3 children: left (text), middle (ul), right (image)
  // Get all grid children
  const gridChildren = Array.from(grid.children);

  // Identify column elements by tag
  let leftCol = null, middleCol = null, rightCol = null;
  gridChildren.forEach(child => {
    if (!leftCol && child.tagName === 'DIV' && child.querySelector('h2, h3, p')) {
      leftCol = child;
    } else if (!middleCol && child.tagName === 'UL') {
      middleCol = child;
    } else if (!rightCol && child.tagName === 'IMG') {
      rightCol = child;
    }
  });

  // Layout: leftCol (the heading and copy), middleCol (the contact info), rightCol (the image)
  // The screenshot shows left column = leftCol + middleCol, right column = rightCol
  const leftColumnContent = [];
  if (leftCol) leftColumnContent.push(leftCol);
  if (middleCol) leftColumnContent.push(middleCol);
  const rightColumnContent = rightCol ? [rightCol] : [];

  // Compose the table cells row
  const cellsRow = [leftColumnContent, rightColumnContent];
  
  // Build the table rows
  const tableArr = [headerRow, cellsRow];
  const block = WebImporter.DOMUtils.createTable(tableArr, document);

  // Replace the original element
  element.replaceWith(block);
}
