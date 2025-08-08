/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match example
  const headerRow = ['Cards (cards33)'];
  // Get all immediate card links (one per card)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));
  const rows = [headerRow];
  cardLinks.forEach(card => {
    // Card structure: <a><div><img><div>(meta+heading+p+CTA)</div></div></a>
    const cardInner = card.querySelector(':scope > div');
    const img = cardInner.querySelector('img');
    const textBlock = cardInner.querySelector(':scope > div');
    // Meta information (tag and read time)
    const metaInfo = textBlock.querySelector('.flex-horizontal');
    // Heading
    const heading = textBlock.querySelector('h3, .h4-heading');
    // Description
    const desc = textBlock.querySelector('p');
    // CTA ("Read")
    let cta = null;
    // Find the 'Read' element (last child, usually)
    const ctaElem = Array.from(textBlock.childNodes).find(n => n.nodeType === 1 && n.textContent.trim().toLowerCase() === 'read');
    if (ctaElem) {
      cta = document.createElement('a');
      cta.href = card.getAttribute('href');
      cta.textContent = ctaElem.textContent;
    }
    // Compose text cell: meta + heading + desc + CTA
    const cellContent = [];
    if (metaInfo) cellContent.push(metaInfo);
    if (heading) cellContent.push(heading);
    if (desc) cellContent.push(desc);
    if (cta) cellContent.push(cta);
    // Push row as [img element, text cell content]
    rows.push([
      img,
      cellContent.length === 1 ? cellContent[0] : cellContent
    ]);
  });
  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(table);
}
