/* global WebImporter */
export default function parse(element, { document }) {
  // The block name header row must be a single-cell row: ['Tabs']
  const headerRow = ['Tabs'];
  
  // Get the tab menu and all the tab links (labels)
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.children) : [];
  // Get all tab panes (tab content)
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.children) : [];

  // Compose each row as [tabLabel, tabContentElem]
  const rows = tabLinks.map(tabLink => {
    // The tab label text is always from the inner div, or fallback to textContent
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }
    // Find content pane with the same data-w-tab attribute
    const tabName = tabLink.getAttribute('data-w-tab');
    const pane = tabPanes.find(p => p.getAttribute('data-w-tab') === tabName);
    let contentElem = null;
    if (pane) {
      // Use the main grid inside the pane if available
      const grid = pane.querySelector('.w-layout-grid, .grid-layout');
      contentElem = grid ? grid : pane;
    } else {
      // If no pane, create empty cell
      contentElem = document.createElement('div');
    }
    return [label, contentElem];
  });
  // The table is: headerRow (one cell), then a row for each tab (label, content)
  const tableRows = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
