/**
 * Filters are grouped and stored in MongoDB as one value as an array of objects { type: category, val: filter }.
 * This helper function finds the value of the specified filter if it is one of those specially grouped filters.
 * @param { Object } doc - the document to search
 * @param { string } type - the category to search for
 * @returns { string } the value (filter) of the searched category
 */
export default function findFilter(doc, type) {
  return doc.facets.find((obj) => obj.type === type).val;
}
