/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match the block name exactly
  const headerRow = ['Hero (hero39)'];

  // 2nd row: Background image (if present)
  // Find the first <img> in the hero, which is the background/decorative image
  const bgImg = element.querySelector('img');
  const imgRow = [bgImg || ''];

  // 3rd row: Content (Heading, subheading, CTA)
  // Find the grid columns: usually 2. The 2nd column has the content text & CTA
  const gridDivs = element.querySelectorAll(':scope > div > div');
  let contentCell = [];
  if (gridDivs.length > 1) {
    // Find the nested grid for content
    const contentGrid = gridDivs[1].querySelector('.w-layout-grid');
    if (contentGrid) {
      // Heading
      const heading = contentGrid.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) contentCell.push(heading);
      // Large paragraph (subheading)
      const para = contentGrid.querySelector('p');
      if (para) contentCell.push(para);
      // CTA (usually a button link)
      const button = contentGrid.querySelector('a, button');
      if (button) contentCell.push(button);
    } else {
      // fallback: push all children if the structure changes
      contentCell = Array.from(gridDivs[1].children);
    }
  }
  // Fallback if no content found
  if (!contentCell.length) contentCell = [''];
  const contentRow = [contentCell];

  // Compose the table
  const cells = [
    headerRow,
    imgRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
