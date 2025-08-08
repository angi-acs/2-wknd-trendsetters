/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Block header from the example: 'Tabs'
  const headerRow = ['Tabs'];

  // 2. Find tab labels (from tab menu) and tab content
  let tabMenu = null;
  let tabContent = null;
  Array.from(element.children).forEach((child) => {
    if (child.classList.contains('w-tab-menu')) {
      tabMenu = child;
    } else if (child.classList.contains('w-tab-content')) {
      tabContent = child;
    }
  });

  // Defensive: If either not found, do nothing
  if (!tabMenu || !tabContent) return;

  // 3. Get tab labels (from tabMenu)
  // Each tab link = <a data-w-tab="Tab 1">...
  const tabLinks = Array.from(tabMenu.querySelectorAll('a[data-w-tab]'));
  // 4. Get tab panes (from tabContent)
  // Each pane = <div data-w-tab="Tab 1">
  const tabPanes = Array.from(tabContent.querySelectorAll('div[data-w-tab]'));

  // 5. Compose rows for each tab
  const rows = tabLinks.map((tabLink, i) => {
    // Tab Label: get inner text from div or fallback to anchor's text
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv && labelDiv.textContent) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }
    // Tab Content: reference the main grid/layout from the pane, fallback to pane itself
    let contentCell;
    if (tabPanes[i]) {
      const contentGrid = tabPanes[i].querySelector('.grid-layout, .w-layout-grid');
      contentCell = contentGrid ? contentGrid : tabPanes[i];
    } else {
      // if missing, create empty div
      contentCell = document.createElement('div');
    }
    return [label, contentCell];
  });

  // 6. Final block table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 7. Replace the original element with the new table
  element.replaceWith(table);
}
