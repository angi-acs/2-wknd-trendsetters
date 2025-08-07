/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table rows
  const rows = [];
  // Header row (must match example exactly)
  rows.push(['Accordion']);

  // Get all immediate accordion child elements
  const accordions = element.querySelectorAll(':scope > .accordion');
  accordions.forEach(acc => {
    // Title cell: get the .w-dropdown-toggle direct child .paragraph-lg (or fallback to last div)
    let toggle = acc.querySelector('.w-dropdown-toggle');
    let title = null;
    if (toggle) {
      title = toggle.querySelector('.paragraph-lg');
      if (!title) {
        // fallback: last div in toggle
        const divs = toggle.querySelectorAll('div');
        if (divs.length > 0) {
          title = divs[divs.length - 1];
        }
      }
    }
    // Content cell: get the .w-dropdown-list .w-richtext (fallback to all content in w-dropdown-list)
    let dropdownList = acc.querySelector('.w-dropdown-list');
    let content = null;
    if (dropdownList) {
      content = dropdownList.querySelector('.w-richtext');
      if (!content) {
        // fallback: all content in dropdownList
        content = document.createElement('div');
        Array.from(dropdownList.childNodes).forEach(node => {
          if (node.nodeType === 1 || (node.nodeType === 3 && node.textContent.trim())) {
            content.appendChild(node);
          }
        });
      }
    }
    // Only add row if both title and content exist
    if (title && content) {
      rows.push([title, content]);
    }
  });
  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
