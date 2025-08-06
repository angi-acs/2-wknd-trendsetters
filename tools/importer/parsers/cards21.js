/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Cards (cards21)'];
  const rows = [];
  // Find each card container
  const cardBodies = element.querySelectorAll('.card-body');
  cardBodies.forEach(cardBody => {
    // Find the image in the card
    const img = cardBody.querySelector('img');
    // Find the heading/title (allow for different heading tags)
    const heading = cardBody.querySelector('.h4-heading, h1, h2, h3, h4, h5, h6');
    // Collect all nodes after the heading as description (if any)
    let textCell = [];
    if (heading) {
      textCell.push(heading);
      let foundHeading = false;
      for (const node of cardBody.childNodes) {
        if (!foundHeading) {
          if (node === heading) foundHeading = true;
          continue;
        }
        if (node.nodeType === 1 && node.tagName === 'IMG') continue; // skip image
        if ((node.nodeType === 3 && node.textContent.trim()) || (node.nodeType === 1 && node.textContent.trim())) {
          textCell.push(node);
        }
      }
    } else {
      // fallback: get all non-image content
      Array.from(cardBody.childNodes).forEach(node => {
        if (node.nodeType === 1 && node.tagName === 'IMG') return;
        if ((node.nodeType === 3 && node.textContent.trim()) || (node.nodeType === 1 && node.textContent.trim())) {
          textCell.push(node);
        }
      });
    }
    if (textCell.length === 0) textCell = [''];
    rows.push([img, textCell]);
  });
  const tableCells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
