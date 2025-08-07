/* global WebImporter */
export default function parse(element, { document }) {
  // Find tab menu containing tab labels
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.children) : [];

  // Extract tab labels from links (try to get the inner div text if present)
  const tabLabels = tabLinks.map(link => {
    const txtEl = link.querySelector('div');
    return txtEl ? txtEl.textContent.trim() : link.textContent.trim();
  });

  // Find tab content container
  const tabContent = element.querySelector('.w-tab-content');
  // Each child is a tab pane
  const tabPanes = tabContent ? Array.from(tabContent.children) : [];

  // Create header row as required
  const rows = [['Tabs']];

  // Add a row for each tab: [tabLabel, tabContent]
  for (let i = 0; i < Math.max(tabLabels.length, tabPanes.length); i++) {
    const tabLabel = tabLabels[i] || '';
    let contentCell = '';
    // Find the pane for this tab
    const pane = tabPanes[i];
    if (pane) {
      // Each pane usually has a single grid container for content
      // We want to preserve all of the pane's direct children
      // If there is only one direct child, use that, otherwise use all
      const paneChildren = Array.from(pane.children);
      if (paneChildren.length === 1) {
        contentCell = paneChildren[0];
      } else if (paneChildren.length > 1) {
        contentCell = paneChildren;
      } else {
        contentCell = '';
      }
    }
    rows.push([tabLabel, contentCell]);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
