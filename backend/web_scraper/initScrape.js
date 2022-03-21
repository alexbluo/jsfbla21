const puppeteer = require("puppeteer");
const scrapePage = require("./scrapePage");
const scrapeHome = require("./scrapeHome");

/**
 * Initializes the scraper and navigates through https://www.visitmaryland.org/things-to-do/attractions,
 * scraping data from the home page and all attraction information pages
 * @returns an array documents to be inserted into MongoDB
 */
async function scrape() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const pagesToScrape = 120;
    await page.goto(`https://www.visitmaryland.org/things-to-do/attractions`, {
        waitUntil: "domcontentloaded",
    });
    let data = {
        attractions: [],
        facets: {
            cities: await scrapeHome.scrapeCities(page),
            amenities: await scrapeHome.scrapeAmenities(page),
        },
    };

    for (let currentPage = 0; currentPage <= pagesToScrape; currentPage++) {
        await page.goto(
            `https://www.visitmaryland.org/things-to-do/attractions?page=${currentPage}`,
            {
                waitUntil: "domcontentloaded",
            }
        );

        const links = await page.$$eval(`a.learn-more`, (anchors) =>
            anchors.map((anchor) => anchor.href)
        );

        for (const link of links) {
            await page.goto(link, {
                waitUntil: "domcontentloaded",
            });

            data.attractions.push(
                await scrapePage(page, data.facets.amenities)
            );
            console.log(currentPage);
        }
    }

    await browser.close();
    return data;
}

module.exports = scrape;
