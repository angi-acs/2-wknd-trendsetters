/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per example
  const headerRow = ['Cards (cards10)'];

  // Find all direct card links
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  const rows = cards.map(card => {
    // Image: first direct div > img
    const imgDiv = card.querySelector(':scope > div');
    const img = imgDiv ? imgDiv.querySelector('img') : null;

    // Content
    const contentDiv = card.querySelector('.utility-padding-all-1rem');
    // Tag (optional; not visually prominent in example, so not bolded in table)
    let tagNode = null;
    const tagDiv = contentDiv ? contentDiv.querySelector('.tag-group .tag') : null;
    if (tagDiv) {
      tagNode = tagDiv;
    }
    // Title (h3, should be strong or h4 inside cell)
    let titleNode = null;
    const h3 = contentDiv ? contentDiv.querySelector('h3') : null;
    if (h3) {
      titleNode = h3;
    }
    // Description (p)
    let descNode = null;
    const p = contentDiv ? contentDiv.querySelector('p') : null;
    if (p) {
      descNode = p;
    }

    // Compose text cell contents (tag, heading, paragraph as nodes)
    const cellNodes = [];
    if (tagNode) {
      cellNodes.push(tagNode);
    }
    if (titleNode) {
      cellNodes.push(titleNode);
    }
    if (descNode) {
      cellNodes.push(descNode);
    }

    // Each row: [image, text content]
    return [img ? img : '', cellNodes];
  });

  // Compose the table
  const tableCells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
