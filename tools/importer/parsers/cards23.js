/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as block name
  const headerRow = ['Cards (cards23)'];
  const rows = [];

  // For each tab pane (can be multiple tabs, each with its own grid)
  const tabPanes = element.querySelectorAll('[class*="w-tab-pane"]');
  tabPanes.forEach(pane => {
    const grid = pane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> within the grid
    Array.from(grid.children).forEach(card => {
      if (card.tagName !== 'A') return;

      // IMAGE cell
      let img = card.querySelector('img');
      let imageCell = img ? img : '';

      // TEXT cell
      const textDiv = document.createElement('div');
      // Use h3 or .h4-heading as strong
      const heading = card.querySelector('h3, .h4-heading');
      if (heading && heading.textContent) {
        const strong = document.createElement('strong');
        strong.textContent = heading.textContent.trim();
        textDiv.appendChild(strong);
        textDiv.appendChild(document.createElement('br'));
      }
      // Description: .paragraph-sm
      const desc = card.querySelector('.paragraph-sm');
      if (desc && desc.textContent) {
        textDiv.appendChild(document.createTextNode(desc.textContent.trim()));
      }
      // Edge case: if not found, fallback on all text (should not happen here, but safe)
      if (!heading && !desc) {
        textDiv.textContent = card.textContent.trim();
      }
      rows.push([imageCell, textDiv]);
    });
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
