/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate children (columns)
  const columnDivs = element.querySelectorAll(':scope > div');
  // Defensive: if no columns, do nothing
  if (columnDivs.length === 0) return;

  // Extract each column's full block (all children in that column)
  const columns = Array.from(columnDivs).map(div => {
    // If multiple children, return them as an array to preserve content structure
    const children = Array.from(div.childNodes).filter(node => node.nodeType === 1);
    if (children.length === 1) return children[0];
    if (children.length > 1) return children;
    // If no element children, return empty string
    return '';
  });

  // Header row is a single cell: block name, as per example
  const headerRow = ['Columns (columns7)'];

  // Construct table rows: header + one row with all columns side by side
  const rows = [
    headerRow,
    columns
  ];

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
