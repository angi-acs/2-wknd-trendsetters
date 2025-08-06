/* global WebImporter */
export default function parse(element, { document }) {
  // Define header row
  const headerRow = ['Hero (hero28)'];

  // Find the .w-layout-grid (main two-column layout)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Extract image from the first grid child that contains an <img>
  let imageEl = null;
  for (const child of gridChildren) {
    const img = child.querySelector('img');
    if (img) {
      imageEl = img;
      break;
    }
  }
  const backgroundRow = [imageEl ? imageEl : ''];

  // Extract the hero text content from grid children containing a heading
  let textBlock = null;
  for (const child of gridChildren) {
    if (child.querySelector('h1, h2, h3, h4, h5, h6')) {
      textBlock = child;
      break;
    }
  }
  // Compose the text row by collecting all children with visible text (e.g., headings, button group, etc.)
  let textRowContent = [];
  if (textBlock) {
    // Only grab elements with text or content
    const elements = Array.from(textBlock.children).filter(el => {
      if (el.tagName.match(/^H[1-6]$/)) return !!el.textContent.trim();
      if (el.tagName === 'DIV' && el.classList.contains('button-group')) return el.children.length > 0;
      if (el.tagName === 'P') return !!el.textContent.trim();
      return false;
    });
    // If nothing matched (e.g., empty button group), just include all
    if (elements.length === 0) textRowContent = Array.from(textBlock.children);
    else textRowContent = elements;
  }
  const textRow = [textRowContent.length === 1 ? textRowContent[0] : textRowContent];

  // Compose the table and replace the element
  const rows = [headerRow, backgroundRow, textRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
