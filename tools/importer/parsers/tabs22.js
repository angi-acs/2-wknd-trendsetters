/* global WebImporter */
export default function parse(element, { document }) {
  // Get the tab menu (labels)
  const tabMenu = element.querySelector('[role="tablist"], .w-tab-menu');
  // Get all tab panes (content)
  const tabContentContainer = element.querySelector('.w-tab-content');
  if (!tabMenu || !tabContentContainer) return;
  const tabLinks = tabMenu.querySelectorAll(':scope > a');
  const tabPanes = tabContentContainer.querySelectorAll(':scope > .w-tab-pane');

  // Build header row
  const headerRow = ['Tabs'];
  // Build the rest of the rows
  const rows = [headerRow];

  // For each tab, add a row with [label, content]
  for (let i = 0; i < tabLinks.length && i < tabPanes.length; i++) {
    // Tab label: use div inside link if present, otherwise link text
    let label = '';
    const div = tabLinks[i].querySelector('div');
    if (div) {
      label = div.textContent.trim();
    } else {
      label = tabLinks[i].textContent.trim();
    }
    // Tab content: reference the main content block of the pane
    // We'll include all children of the tab pane as a fragment
    const pane = tabPanes[i];
    let content;
    if (pane.children.length === 1) {
      // Use the single child directly (e.g., grid or flex container)
      content = pane.firstElementChild;
    } else if (pane.children.length > 1) {
      // Combine all children in a fragment
      const frag = document.createDocumentFragment();
      Array.from(pane.children).forEach(child => frag.appendChild(child));
      content = frag;
    } else {
      // No children: fallback to pane itself
      content = pane;
    }
    rows.push([label, content]);
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
