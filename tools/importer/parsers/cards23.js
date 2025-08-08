/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches example: Cards (cards23)
  const headerRow = ['Cards (cards23)'];
  const cells = [headerRow];

  // Find all tab panes (each tab may contain cards)
  const tabPanes = element.querySelectorAll('[role="tabpanel"]');
  tabPanes.forEach((tabPane) => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> (covers all variations in sample HTML)
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // Card image, if present
      let img = null;
      const aspectDiv = card.querySelector('.utility-aspect-3x2');
      if (aspectDiv) {
        img = aspectDiv.querySelector('img');
      }
      // Heading (h3)
      const heading = card.querySelector('h3');
      // Description: first .paragraph-sm (may have utility-margin-bottom-0)
      let desc = null;
      const descDiv = card.querySelector('.paragraph-sm');
      if (descDiv) {
        desc = descDiv;
      }
      // Compose text block
      const textCell = document.createElement('div');
      if (heading) textCell.appendChild(heading);
      if (desc) textCell.appendChild(desc);
      // Compose table row: image in first cell, text in second
      cells.push([
        img ? img : '',
        textCell
      ]);
    });
  });

  // Create block table and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.parentNode.replaceChild(block, element);
}
