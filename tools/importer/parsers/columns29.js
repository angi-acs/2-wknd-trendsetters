/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header matches the example
  const headerRow = ['Columns (columns29)'];

  // 2. Get direct children divs for columns
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // 3. For each column, reference all its children (usually 1 img per column)
  //    - For robustness: get all children (not just img), but example only has img
  const columns = columnDivs.map(colDiv => {
    // If column is empty, return an empty string to keep cell alignment
    if (!colDiv.hasChildNodes()) return '';
    // If only one child, return the element
    if (colDiv.childNodes.length === 1) return colDiv.firstChild;
    // Else, return all children
    return Array.from(colDiv.childNodes);
  });

  // 4. Build the cells array as per block structure
  const cells = [
    headerRow,
    columns
  ];

  // 5. Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace original element with new block table
  element.replaceWith(block);
}
