/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches block name exactly
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Each tab contains a grid of cards
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((tabPane) => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (grid) {
      // Each card is a direct <a> in the grid
      const cardLinks = grid.querySelectorAll(':scope > a');
      cardLinks.forEach((card) => {
        // IMAGE/ICON cell
        let img = card.querySelector('img');
        // TEXT cell
        let title = card.querySelector('h3, .h4-heading');
        let desc = card.querySelector('div.paragraph-sm');
        // Build the text cell with existing elements (no cloning, no new content)
        const textFrag = document.createDocumentFragment();
        if (title) textFrag.appendChild(title);
        if (desc) {
          if (title) textFrag.appendChild(document.createElement('br'));
          textFrag.appendChild(desc);
        }
        rows.push([
          img ? img : '',
          textFrag
        ]);
      });
    }
  });

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
