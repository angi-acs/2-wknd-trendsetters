/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first .grid-layout with both content and image (the outer two-column grid)
  const mainGrid = element.querySelector('.grid-layout.grid-gap-xxl');
  if (!mainGrid) return;

  // Get immediate children of the main grid (usually [content, image])
  const children = Array.from(mainGrid.children);

  // Identify left column (content) and right column (image)
  let leftContent = null;
  let rightContent = null;

  children.forEach(child => {
    if (child.matches('img')) {
      rightContent = child;
    } else if (child.querySelector('h2')) {
      leftContent = child;
    }
  });

  // Defensive: Require both columns
  if (!leftContent || !rightContent) return;

  // Compose block table array
  const cells = [
    ['Columns (columns5)'],
    [leftContent, rightContent]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
