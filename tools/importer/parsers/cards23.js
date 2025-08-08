/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as specified in the example
  const headerRow = ['Cards (cards23)'];

  // Gather all card data from all tab panes
  // Each tab pane contains a grid with a set of card links
  const allCardRows = [];
  // Find all grids inside the block
  const gridContainers = element.querySelectorAll('.w-layout-grid');

  gridContainers.forEach((grid) => {
    // Each grid contains multiple card links (either with image or just text)
    const cards = Array.from(grid.querySelectorAll(':scope > a'));
    cards.forEach((card) => {
      // First cell: image (if present)
      let img = null;
      const imageDiv = card.querySelector('.utility-aspect-3x2');
      if (imageDiv) {
        img = imageDiv.querySelector('img');
      }

      // Second cell: text content: heading + description (existing elements)
      const textContent = document.createElement('div');
      textContent.className = 'cards23-text';
      // Heading (h3)
      const heading = card.querySelector('h3');
      if (heading) textContent.appendChild(heading);
      // Description (div.paragraph-sm)
      const desc = card.querySelector('.paragraph-sm');
      if (desc) textContent.appendChild(desc);

      // Add row for table (always 2 columns)
      allCardRows.push([img ? img : '', textContent]);
    });
  });

  // Compose the table: header row, then one row per card
  const tableData = [headerRow, ...allCardRows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
