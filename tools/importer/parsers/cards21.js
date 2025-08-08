/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name must match example
  const headerRow = ['Cards (cards21)'];

  // Find all card bodies (to support robust multi-card parsing)
  const cardBodies = element.querySelectorAll('.card-body');
  const cardRows = [];

  cardBodies.forEach(cardBody => {
    // Image/icon in first cell
    const img = cardBody.querySelector('img');

    // Title (heading)
    const heading = cardBody.querySelector('.h4-heading');

    // Description: all remaining text in cardBody except for heading
    let descriptionText = '';
    if (heading) {
      // Create a clone to avoid mutating live DOM
      const cardClone = cardBody.cloneNode(true);
      // Remove the heading from the clone
      const headingClone = cardClone.querySelector('.h4-heading');
      if (headingClone) headingClone.remove();
      // Remove all images from clone
      cardClone.querySelectorAll('img').forEach(imgEl => imgEl.remove());
      descriptionText = cardClone.textContent.trim();
    }

    // Compose the text cell: heading (if present) + description (if present)
    const textCellContent = [];
    if (heading) textCellContent.push(heading);
    if (descriptionText) {
      const descDiv = document.createElement('div');
      descDiv.textContent = descriptionText;
      textCellContent.push(descDiv);
    }
    cardRows.push([
      img || '',
      textCellContent.length ? textCellContent : ''
    ]);
  });

  // Compose final table
  const cells = [headerRow, ...cardRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
