/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards24) block header
  const headerRow = ['Cards (cards24)'];

  // Get all direct card elements
  const cards = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block'));
  const rows = [headerRow];

  cards.forEach(card => {
    // First cell: image (reference the <img> element inside the aspect div)
    let imageEl = null;
    const aspectDiv = card.querySelector('.utility-aspect-2x3');
    if (aspectDiv) {
      imageEl = aspectDiv.querySelector('img');
    }

    // Second cell: text (category/tag, date, title)
    // Get meta info (tag and date)
    const metaDiv = card.querySelector('.flex-horizontal');
    let tagText = '', dateText = '';
    if (metaDiv) {
      const tagDiv = metaDiv.querySelector('.tag');
      if (tagDiv) tagText = tagDiv.textContent.trim();
      const dateDiv = metaDiv.querySelector('.paragraph-sm');
      if (dateDiv) dateText = dateDiv.textContent.trim();
    }
    // Get card title
    const titleEl = card.querySelector('h3, .h4-heading');

    // Build the second cell
    const cellFrag = document.createElement('div');
    // Add tag & date in a single line, if present
    if (tagText || dateText) {
      const metaLine = document.createElement('div');
      if (tagText) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tagText;
        metaLine.appendChild(tagSpan);
      }
      if (tagText && dateText) {
        metaLine.appendChild(document.createTextNode(' '));
      }
      if (dateText) {
        const dateSpan = document.createElement('span');
        dateSpan.textContent = dateText;
        metaLine.appendChild(dateSpan);
      }
      cellFrag.appendChild(metaLine);
    }
    // Add the heading/title
    if (titleEl) {
      cellFrag.appendChild(titleEl);
    }

    rows.push([imageEl, cellFrag]);
  });

  // Create the table block and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
