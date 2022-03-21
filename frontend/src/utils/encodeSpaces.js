/**
 * Encodes the spaces of a section of a URI, mainly used for query parameters
 * @param { String } param - the section of the query param to encode
 * @returns the encoded query string
 */
export default function encodeSpaces(param) {
    return param.split(" ").join("+");
}
