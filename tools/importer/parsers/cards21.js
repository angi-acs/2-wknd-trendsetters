/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches the block spec
  const headerRow = ['Cards (cards21)'];
  if (!element) return;

  // Find the most specific card container
  const cardBody = element.querySelector('.card-body') || element;

  // Extract image (mandatory)
  const imgEl = cardBody.querySelector('img');
  if (!imgEl) return;

  // Extract heading/title (mandatory)
  const titleEl = cardBody.querySelector('.h4-heading, h1, h2, h3, h4, h5, h6');
  if (!titleEl) return;

  // Find any description/body text nodes: all elements except heading and image
  const descriptionNodes = [];
  cardBody.childNodes.forEach((node) => {
    // Skip heading and image
    if (node === titleEl || node === imgEl) return;
    // Skip empty text nodes
    if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) return;
    descriptionNodes.push(node);
  });

  // Compose second cell: heading + description nodes (if present)
  let secondCell;
  if (descriptionNodes.length > 0) {
    // Combine heading and description into a fragment
    const frag = document.createDocumentFragment();
    frag.appendChild(titleEl);
    descriptionNodes.forEach((node) => frag.appendChild(node));
    secondCell = frag;
  } else {
    secondCell = titleEl;
  }

  // Compose block table rows
  const rows = [headerRow, [imgEl, secondCell]];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
