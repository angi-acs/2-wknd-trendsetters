/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards21)'];
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Extract image
  const img = cardBody.querySelector('img');
  // Extract title (first heading or .h4-heading)
  const titleEl = cardBody.querySelector('.h4-heading, h1, h2, h3, h4, h5, h6');

  // Extract description: all text (and elements) except title and image
  let descParts = [];
  for (const node of cardBody.childNodes) {
    if (node === img || node === titleEl) continue;
    if (node.nodeType === Node.TEXT_NODE) {
      // Only non-empty text
      if (node.textContent.trim()) descParts.push(document.createTextNode(node.textContent.trim()));
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      descParts.push(node);
    }
  }

  // If any description, create a <div> for it
  let descEl = null;
  if (descParts.length > 0) {
    descEl = document.createElement('div');
    descParts.forEach(part => descEl.appendChild(part));
  }

  // Compose [title, description] in second cell if both exist, else just one
  let textCell = [];
  if (titleEl) textCell.push(titleEl);
  if (descEl) textCell.push(descEl);
  if (textCell.length === 0) textCell = '';
  else if (textCell.length === 1) textCell = textCell[0];

  const rows = [headerRow, [img, textCell]];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
