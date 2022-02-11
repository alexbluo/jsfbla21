/**
 * Since certain fields used to filter for results, 
 * they are grouped into one field in order to minimize both index size and document size.
 * Stored in the form of:
 * facets : [ 
 *            { type: INSERT_FIELD, val: INSERT_VALUE }, 
 *            { type: INSERT_FIELD, val: INSERT_VALUE },
 *            ...
 *          ]
 * 
 * This helper function finds the value of the specified field
 * @precondition - the specified field must be stored within facets
 * @param { Object } doc - the document to search
 * @param { string } type - the field to search for  
 * @returns { string } the value for the searched field
 */
export default function findFacet(doc, type) {
  return doc.facets.find((obj) => obj.type === type).val
} 