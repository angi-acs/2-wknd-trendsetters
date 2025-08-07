/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in the example
  const headerRow = ['Hero (hero6)'];

  // Extract background image (should be the .cover-image inside the left grid area)
  const bgImg = element.querySelector('img.cover-image');
  const imageRow = [bgImg ? bgImg : ''];

  // Extract text card (headline, subheading, CTAs) from the right-side grid
  let contentRow = [''];
  const textCard = element.querySelector('.card');
  if (textCard) {
    // Gather content in order: heading(s), subheading, ctas
    const parts = [];
    // Headline (keep its heading level)
    const heading = textCard.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) parts.push(heading);
    // Subheading (either .subheading or first <p>)
    // Prefer .subheading if present
    let subheading = textCard.querySelector('.subheading');
    if (!subheading) {
      // fallback to first <p> that is not inside a .button-group
      subheading = Array.from(textCard.querySelectorAll('p')).find(p => !p.closest('.button-group'));
    }
    if (subheading) parts.push(subheading);
    // Button group (if present)
    const buttonGroup = textCard.querySelector('.button-group');
    if (buttonGroup) parts.push(buttonGroup);
    contentRow = [parts];
  }

  // Build the table as per required format (Header, Image, Content)
  const rows = [
    headerRow,
    imageRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
