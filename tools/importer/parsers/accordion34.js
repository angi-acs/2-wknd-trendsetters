/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare table rows: header first
  const rows = [['Accordion']];
  // Get all direct accordion children
  const accordionEls = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordionEls.forEach(acc => {
    // Title: Find .w-dropdown-toggle > .paragraph-lg (the actual label)
    let titleEl = acc.querySelector('.w-dropdown-toggle .paragraph-lg');
    // Defensive: fallback to first direct div inside .w-dropdown-toggle if needed
    if (!titleEl) {
      const toggle = acc.querySelector('.w-dropdown-toggle');
      if (toggle) {
        titleEl = Array.from(toggle.children).find(child => child.tagName === 'DIV');
      }
    }
    // Defensive: If still missing title, use empty string
    if (!titleEl) {
      titleEl = document.createElement('span');
      titleEl.textContent = '';
    }

    // Content: Find .accordion-content (typically nav) and then get the actual content div
    let contentEl = acc.querySelector('.accordion-content');
    let bodyContent = contentEl;
    if (contentEl) {
      // Sometimes content is wrapped inside .utility-padding or .rich-text
      const innerDiv = contentEl.querySelector('.rich-text, .utility-padding-all-1rem, div');
      if (innerDiv) {
        bodyContent = innerDiv;
      }
    } else {
      // Fallback: .w-dropdown-list
      bodyContent = acc.querySelector('.w-dropdown-list');
    }
    // Defensive: If no content, use an empty element
    if (!bodyContent) {
      bodyContent = document.createElement('span');
      bodyContent.textContent = '';
    }

    rows.push([titleEl, bodyContent]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
