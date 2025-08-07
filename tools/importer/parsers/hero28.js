/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero28)'];

  // 2. Background image row
  // Find the first <img> that is likely the background image
  let bgImg = null;
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    // The first child div of grid has the background image
    const gridChildren = Array.from(grid.children);
    if (gridChildren.length > 0) {
      const bgDiv = gridChildren[0];
      bgImg = bgDiv.querySelector('img');
    }
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (heading, subheading, CTA)
  let contentCell = [];
  if (grid) {
    // The second child div of grid has the text content
    const gridChildren = Array.from(grid.children);
    if (gridChildren.length > 1) {
      const contentDiv = gridChildren[1];
      // Find heading(s)
      const headings = contentDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach(h => contentCell.push(h));
      // Find CTA button(s)
      const buttonGroup = contentDiv.querySelector('.button-group');
      if (buttonGroup) {
        // add each child (if any) of button group
        if (buttonGroup.children.length > 0) {
          contentCell.push(...buttonGroup.children);
        }
      }
    }
  }
  // Fallback if nothing found
  if (contentCell.length === 0) {
    contentCell = [''];
  }
  const contentRow = [contentCell];

  // Compose the table
  const cells = [
    headerRow,
    bgImgRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
