/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row
  const rows = [['Accordion']];
  // Find all immediate accordion items (direct children)
  const items = element.querySelectorAll(':scope > .accordion, :scope > .w-dropdown');
  items.forEach((item) => {
    // Title cell extraction
    let titleCell;
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      // Try to get the actual text container (prefer .paragraph-lg, but fallback to any child text)
      const label = toggle.querySelector('.paragraph-lg, p, h1, h2, h3, h4, h5, h6, span');
      titleCell = label ? label : toggle;
    } else {
      // Fallback, use first text node or the toggle itself
      titleCell = item;
    }
    // Content cell extraction
    let contentCell;
    const nav = item.querySelector('.accordion-content, .w-dropdown-list');
    if (nav) {
      // Look for a rich text container, fallback to nav itself
      const rich = nav.querySelector('.rich-text, .w-richtext');
      if (rich) {
        contentCell = rich;
      } else {
        // Try to use content wrapper div
        const div = nav.querySelector('div');
        contentCell = div ? div : nav;
      }
    } else {
      contentCell = item;
    }
    rows.push([titleCell, contentCell]);
  });
  // Create table block and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
