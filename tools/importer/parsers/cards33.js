/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Cards (cards33)'];

  // Find all card anchor elements (each card is an <a>)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map(card => {
    // First cell: image (mandatory)
    const img = card.querySelector('img');

    // Second cell: text content (mandatory)
    // Find the container that holds the text (includes tag, read time, h3, p, CTA)
    // It's the innermost div containing the h3
    const heading = card.querySelector('h3, .h4-heading');
    let textDiv = heading && heading.closest('div');
    // Fallback to the main inner <div> after <img> if needed
    if (!textDiv) {
      const divs = card.querySelectorAll('div');
      textDiv = divs[divs.length - 1];
    }
    // Exclude the image if it's inside textDiv by mistake
    let cellContent;
    if (textDiv) {
      // Remove the image from textDiv if present
      const imgs = textDiv.querySelectorAll('img');
      imgs.forEach(i => i.remove());
      // Use all children, preserving structure
      cellContent = Array.from(textDiv.childNodes).filter(node => {
        // Remove empty text nodes
        return node.nodeType !== Node.TEXT_NODE || node.textContent.trim();
      });
    } else {
      cellContent = '';
    }

    return [img, cellContent.length === 1 ? cellContent[0] : cellContent];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
