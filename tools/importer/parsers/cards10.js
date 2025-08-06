/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Each card is an <a> inside the grid
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach((card) => {
    // Image cell: find the first <img> within the card (covers various possible wrappers)
    const imgEl = card.querySelector('img');

    // Text cell: collect tag, title, description in original DOM order
    const textWrap = card.querySelector('.utility-padding-all-1rem') || card;
    const textCellEls = [];
    // Get tag group (optional)
    const tagGroup = textWrap.querySelector('.tag-group');
    if (tagGroup) textCellEls.push(tagGroup);
    // Get heading (h3 or similar)
    const heading = textWrap.querySelector('h3, .h4-heading');
    if (heading) textCellEls.push(heading);
    // Get description (p, .paragraph-sm)
    const desc = textWrap.querySelector('p, .paragraph-sm');
    if (desc) textCellEls.push(desc);

    rows.push([
      imgEl,
      textCellEls
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
