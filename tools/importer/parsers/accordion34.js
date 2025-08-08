/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block: header row is always ['Accordion']
  const cells = [['Accordion']];
  
  // Find all direct children having accordion class
  const accordionItems = element.querySelectorAll(':scope > .accordion');

  accordionItems.forEach((item) => {
    // Title: the toggle element, look for prominent text
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleCell;
    if (toggle) {
      // Prefer .paragraph-lg inside toggle
      titleCell = toggle.querySelector('.paragraph-lg');
      if (!titleCell) {
        // Fallback: first child div or all text in toggle
        let div = toggle.querySelector('div');
        titleCell = div ? div : toggle;
      }
    } else {
      // Edge case: no toggle, use item itself (shouldn't happen in these examples)
      titleCell = item;
    }

    // Content: inside nav.accordion-content or .w-dropdown-list
    const contentNav = item.querySelector('.w-dropdown-list');
    let contentCell;
    if (contentNav) {
      // Prefer .w-richtext inside
      const richText = contentNav.querySelector('.w-richtext');
      contentCell = richText ? richText : contentNav;
    } else {
      // Edge case: fallback to item
      contentCell = item;
    }

    // Add row: [title, content]
    cells.push([titleCell, contentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element
  element.replaceWith(table);
}
