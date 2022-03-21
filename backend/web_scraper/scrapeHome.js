/**
 * Scrapes https://www.visitmaryland.org/things-to-do/attractions for all the 'city' facets
 * @param { puppeteer.Page } page - a reference to the Page object
 * @returns { string[] } an array of all the cities that are available as search filters
 */
async function scrapeCities(page) {
    const cities = await page.$$eval(
        "li[data-tracking-facet-id='profilecities']",
        (elements) =>
            elements.map((element) =>
                element.getAttribute("data-tracking-facet-value")
            )
    );
    return cities;
}

/**
 * Scrapes https://www.visitmaryland.org/things-to-do/attractions for all the 'amenities' facets
 * @param { puppeteer.Page } page
 * @returns { string[] } an array of all the amenities that are available as search filters
 */
async function scrapeAmenities(page) {
    const amenities = await page.$$eval(
        "li[data-tracking-facet-id='profileamenities']",
        (elements) =>
            elements.map((element) =>
                element.getAttribute("data-tracking-facet-value")
            )
    );
    return amenities;
}

module.exports = {
    scrapeCities,
    scrapeAmenities,
};
