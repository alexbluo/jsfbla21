/**
 * Scrapes the current attraction information page for various data fields
 * @param { puppeteer.Page } page - a reference to the page object
 * @param { string[] } facetAmenities - the list of amenity filters from the home page
 * @returns a document containing data on the attraction which the current page is on
 */
async function scrapePage(page) {
  const mainArticleSelector =
    "article.entity--type-node.node--profile--full.node--listing--full.node--profile.node--promoted";

  const pageData = {
    attraction_id: await tryQuerySelector(mainArticleSelector, "data-delid"),

    attraction_name: await tryQuerySelector(mainArticleSelector, "data-dename"),

    attraction_image: await tryQuerySelector("img.media__image", "src"),

    // [<lon>, <lat>]
    coordinates: [
      parseFloat(await tryQuerySelector(mainArticleSelector, "data-lon")),
      parseFloat(await tryQuerySelector(mainArticleSelector, "data-lat")),
    ],

    website_link: await tryQuerySelector("a.button-gold.website-link", "href"),

    directions_link: await tryQuerySelector("a.button.get-directions", "href"),

    address: await tryQuerySelector("div.address", "innerText"),

    city: await tryQuerySelector("span.city", "innerText"),

    state: await tryQuerySelector("span.state", "innerText"),

    zip: await tryQuerySelector("span.zip", "innerText"),

    region: await tryQuerySelector(
      "div.field.field--name-name.field--type-string.field--label-hidden.field__item",
      "innerHTML"
    ),

    phone_number: await tryQuerySelector(
      "a.phone-link.email--local_phone",
      "innerText"
    ),

    fax: await tryQuerySelector("a.phone-link.email--fax", "innerText"),

    mailto_link: await tryQuerySelector("a.email--business_email", "href"),

    description: await tryQuerySelector(
      "div.mmg8-listing-fields.mmg8_listing_fields_description",
      "innerText"
    ),

    region_image: await tryQuerySelector(
      "div.field.field--name-field-region-image.field--type-image > img",
      "src"
    ),

    category: parseURLforCategory(page.url()),

    // this can include ALL amenities whereas filterAmenities only includes common ones used as filters
    amenities: await tryQuerySelectorAll(
      "li.amenity--subamenities--subamenity",
      "innerHTML"
    ),
  };

  // hard code typo on website
  if (pageData.amenities && pageData.amenities.includes("Self-Guides Tours")) {
    pageData.amenities[pageData.amenities.indexOf("Self-Guides Tours")] =
      "Self-Guided Tours";
  }

  console.log(pageData);
  return pageData;

  /**
   * Runs document.querySelector() and takes the property/attribute of the returned element
   * @param { string } selector - a selector to query document for
   * @param { string } tag - a property or attribute to be taken from the element returned by document.querySelector()
   * @returns { string[] } the property/attribute of the queried element, or null if the selector is not matched
   */
  async function tryQuerySelector(selector, tag) {
    const result = page.evaluate(
      (selector, tag) => {
        const element = document.querySelector(selector);
        if (element == null) return null;
        return tag ? element[tag] || element.getAttribute(tag) : element;
      },
      selector,
      tag
    );

    return result;
  }

  /**
   * Runs document.querySelectorAll(), mapping the returned elements to their respective tags or attributes
   * @param { string } selector - a selector to query document for
   * @param { string } tag - a property or attribute to be taken from the elements returned by Array.from(document.querySelectorAll())
   * @returns { string[] } an array of properties/attributes of the queried elements, or null if selector is not matched
   */
  async function tryQuerySelectorAll(selector, tag) {
    const result = page.evaluate(
      (selector, tag) => {
        const elements = Array.from(document.querySelectorAll(selector));
        if (elements.length == 0) return null;
        return tag
          ? elements.map((element) => element[tag] || element.getAttribute(tag))
          : elements;
      },
      selector,
      tag
    );

    return result;
  }
}

/**
 * Parses the URL path for the category
 * @param { string } URL - the URL to be parsed
 * @returns { string } the name of the category in the URL path, properly capitalized and spaced
 */
function parseURLforCategory(URL) {
  const path = URL.match(".*/(.*)/(.*)$"); // path of url represented as an array of words delimited by '/'
  const category = path[1]
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");

  // hard code special cases
  if (category === "Breweries Wineries Distilleries")
    return "Breweries, Wineries, & Distilleries";
  if (category === "History Heritage") return "History & Heritage";
  if (category === "Arts Culture") return "Arts & Culture";
  if (category === "Gaming Casinos") return "Gaming & Casinos";
  if (category === "Scenic Points Landmarks")
    return "Scenic Points & Landmarks";
  if (category === "Science Education") return "Science & Education";
  if (category === "Zoos Aquariums") return "Zoos & Aquariums";
  if (category === "Attraction") return "General Attractions";

  return category;
}

module.exports = scrapePage;
