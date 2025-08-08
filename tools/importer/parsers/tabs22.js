/* global WebImporter */
export default function parse(element, { document }) {
  // Get tab labels from the tab menu
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.children) : [];
  const tabLabels = tabLinks.map(link => {
    const div = link.querySelector('div');
    return div ? div.textContent.trim() : link.textContent.trim();
  });

  // Get tab content panes
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.children) : [];

  // First row: header row with just the block name, single cell
  const rows = [['Tabs']];

  // Each subsequent row: [label, content]
  for (let i = 0; i < tabLabels.length; i++) {
    const label = tabLabels[i];
    const pane = tabPanes[i];
    if (!pane) continue;
    const content = pane.querySelector(':scope > .w-layout-grid') || pane;
    rows.push([label, content]);
  }

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Set colspan on the header row for proper visual alignment
  const thRow = table.querySelector('tr:first-child');
  if (thRow && thRow.children.length === 1) {
    thRow.children[0].setAttribute('colspan', '2');
  }

  // Replace the original element
  element.replaceWith(table);
}
