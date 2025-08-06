/* global WebImporter */
export default function parse(element, { document }) {
  // Find all tab panes
  const panes = Array.from(element.querySelectorAll(':scope > .w-tab-pane'));
  // Prefer the active pane, or the first one
  const activePane = panes.find(pane => pane.classList.contains('w--tab-active')) || panes[0];
  if (!activePane) return;

  // Find the grid inside the active pane
  const grid = activePane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Gather all direct child links of grid (each is a card)
  const cardLinks = Array.from(grid.children).filter(el => el.tagName === 'A');

  // Compose rows for the table; header first
  const rows = [['Cards (cards23)']];

  cardLinks.forEach(card => {
    // Image cell: find the first <img> (if present). Place its wrapper div if it has one.
    let imgCell = '';
    const img = card.querySelector('img');
    if (img) {
      // Use the closest aspect-ratio wrapper, or just the image
      const aspectDiv = img.closest('.utility-aspect-3x2');
      imgCell = aspectDiv ? aspectDiv : img;
    }

    // Text cell: gather all visible headings and description blocks in order
    const textCellContent = [];
    // All h1-h6 children in order
    card.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
      textCellContent.push(h);
    });
    // All .paragraph-sm (descriptions) in order
    card.querySelectorAll('.paragraph-sm').forEach(p => {
      textCellContent.push(p);
    });
    // Also, if there are other text-only divs (not the heading or description), include them
    card.querySelectorAll(':scope > div').forEach(div => {
      // Avoid including image wrappers or already included .paragraph-sm etc
      if (!div.querySelector('img') &&
          !div.matches('.utility-aspect-3x2') &&
          !div.matches('.flex-horizontal') &&
          !div.matches('.utility-text-align-center')) {
        // Only include if not already present
        if (![...textCellContent].includes(div) && div.textContent.trim()) {
          textCellContent.push(div);
        }
      }
    });
    // Fallback: if nothing found, use card.textContent (should rarely happen)
    let textCell = textCellContent.length > 0 ? textCellContent : card.textContent.trim();

    rows.push([imgCell, textCell]);
  });

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
