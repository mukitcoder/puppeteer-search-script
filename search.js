const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const searchQuery = 'puppeteer';

    await page.goto('https://www.google.com');

    await page.type('input[name="q"]', searchQuery);

    await Promise.all([
        page.waitForNavigation(),
        page.click('input[name="btnK"]')
    ]);

    const results = await page.evaluate(() => {
        let items = Array.from(document.querySelectorAll('h3')).map(item => item.innerText);
        return items;
    });

    console.log('Search Results:', results);

    await browser.close();
})();
