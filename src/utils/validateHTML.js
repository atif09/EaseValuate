export function validateHTML(html) {
  if (typeof html !== 'string') return false;
  const doc = document.implementation.createHTMLDocument('');
  doc.body.innerHTML = html;

  //no problem in browser + children = probably valid
  return doc.body.children.length > 0;
}