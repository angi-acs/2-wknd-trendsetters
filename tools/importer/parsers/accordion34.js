/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row
  const cells = [['Accordion']];

  // Select all immediate accordion blocks inside the element
  // These may have multiple classes (e.g., 'accordion transparent-accordion w-dropdown')
  const accordionBlocks = element.querySelectorAll(':scope > .accordion, :scope > .w-dropdown');
  accordionBlocks.forEach((block) => {
    // Extract the title (should be inside the toggle button/div)
    let titleCell;
    const toggle = block.querySelector('.w-dropdown-toggle, [role="button"]');
    if (toggle) {
      // Try to find the visible label (ignore icon)
      let label = toggle.querySelector('.paragraph-lg');
      if (!label) {
        // fallback: try the first element node that is not the icon
        label = Array.from(toggle.children).find(el => el.nodeType === 1 && !el.classList.contains('dropdown-icon'));
      }
      if (label) {
        titleCell = label;
      } else {
        // fallback: make a span with the textContent if nothing else
        const span = document.createElement('span');
        span.textContent = toggle.textContent.trim();
        titleCell = span;
      }
    } else {
      // fallback: whole block as cell
      titleCell = document.createElement('span');
      titleCell.textContent = '';
    }

    // Extract the content (should be inside nav or .w-dropdown-list)
    let contentCell;
    const contentContainer = block.querySelector('.w-dropdown-list, nav, .accordion-content');
    if (contentContainer) {
      // Find the most relevant inner content
      const pad = contentContainer.querySelector('.utility-padding-all-1rem, .utility-padding-horizontal-0') || contentContainer;
      const rich = pad.querySelector('.rich-text, .w-richtext');
      if (rich) {
        contentCell = rich;
      } else {
        contentCell = pad;
      }
    } else {
      // fallback: empty content
      contentCell = document.createElement('div');
    }

    cells.push([titleCell, contentCell]);
  });

  // Build block table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}