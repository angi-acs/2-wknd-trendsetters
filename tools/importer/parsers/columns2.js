/* global WebImporter */
export default function parse(element, { document }) {
  // --- HEADER ROW ---
  const headerRow = ['Columns (columns2)'];

  // --- EXTRACT THE GRID ---
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 3) return;

  // --- FIRST COLUMN (main left card) ---
  const leftCol = gridChildren[0];

  // --- SECOND COLUMN (top right two cards) ---
  const rightTopCol = gridChildren[1];
  // Immediate children are the <a> cards
  const rightTopCards = Array.from(rightTopCol.querySelectorAll(':scope > a'));

  // --- THIRD COLUMN (vertical stack of text cards, with dividers) ---
  const rightBottomCol = gridChildren[2];
  // Immediate children include <a> and .divider
  const rightBottomEls = Array.from(rightBottomCol.childNodes).filter(node => node.nodeType === 1); // element nodes only

  // Combine the two right columns into one cell, preserving the original structure
  const rightColDiv = document.createElement('div');

  // Add rightTopCards first
  rightTopCards.forEach(card => rightColDiv.appendChild(card));

  // Then add the rightBottomEls (which are <a> and .divider in order)
  rightBottomEls.forEach(el => rightColDiv.appendChild(el));

  // --- CELLS ---
  const cells = [
    headerRow,
    [leftCol, rightColDiv],
  ];

  // --- CREATE AND REPLACE ---
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
