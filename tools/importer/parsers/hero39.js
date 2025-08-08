/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row (block name, exact per example)
  const headerRow = ['Hero (hero39)'];

  // 2. Get the background image (as the only main image in the first .w-layout-grid child)
  const gridLayout = element.querySelector('.w-layout-grid');
  if (!gridLayout) return;
  const gridChildren = gridLayout.querySelectorAll(':scope > div');
  if (gridChildren.length < 2) return;

  const imageContainer = gridChildren[0];
  const img = imageContainer.querySelector('img');
  const imageRow = [img ? img : ''];

  // 3. Get text content: h1, p, button(s)
  const contentContainer = gridChildren[1];
  const textElements = [];
  // Find the heading
  const h1 = contentContainer.querySelector('h1');
  if (h1) textElements.push(h1);
  // Find the paragraph (subheading)
  const p = contentContainer.querySelector('p');
  if (p) textElements.push(p);
  // Find the CTA(s) (a.button...)
  const btnGroup = contentContainer.querySelector('.button-group');
  if (btnGroup) {
    // May be several buttons
    const buttons = btnGroup.querySelectorAll('a');
    buttons.forEach(btn => textElements.push(btn));
  }
  const contentRow = [textElements];

  // 4. Compose block table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
