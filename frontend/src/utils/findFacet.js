/**
 * Since certain fields are used to filter for results,
 * they are grouped and stored in one field as an array of objects in order to minimize both index size and document size.
 * This helper function finds the value of the specified field if it is one of those specially grouped fields.
 * @param { Object } doc - the document to search
 * @param { string } type - the field to search for
 * @returns { string } the value for the searched field
 */
export default function findFacet(doc, type) {
    return doc.facets.find((obj) => obj.type === type).val;
}
