const express = require('express');
const cheerio = require('cheerio');
const cors = require('cors');
const axios = require('axios');
const puppeteer = require('puppeteer');


const app = express();




// Apply CORS middleware
const corsOptions = {
    origin: ['http://localhost:5173'], // Allow frontend to access backend
    optionsSuccessStatus: 200,
};



const getForexFactoryData = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        console.log('Navigating to site...');
        await page.goto('https://www.forexfactory.com/', {
            waitUntil: 'domcontentloaded',
            timeout: 0,
        });

        console.log('Waiting for table...');
        await page.waitForSelector('.calendar__table', { timeout: 60000 });

        // Take a screenshot after the table is detected
        await page.screenshot({ path: 'table-loaded.png', fullPage: true });

        const newsItems = await page.evaluate(() => {
            const rows = document.querySelectorAll('tr.calendar__row[data-event-id]');
            const data = [];
        
            rows.forEach(row => {
                const impact = row.querySelector('.calendar__impact span')?.getAttribute('title');
                const time = row.querySelector('.calendar__time span')?.textContent.trim();
                const currency = row.querySelector('.calendar__currency span')?.textContent.trim();
                const event = row.querySelector('.calendar__event-title')?.textContent.trim();
        
                if (impact && (impact.includes('High') || impact.includes('Medium')) && currency.includes('USD')) {
                    data.push({ time, currency, event, impact });
                }
            });
        
            return data;
        });
        
        console.log('Scraped news:', newsItems);

        await browser.close();
        return newsItems;

    } catch (error) {
        console.error('Scraper error:', error);
        await page.screenshot({ path: 'error.png', fullPage: true }); // capture what went wrong
        await browser.close();
        return [];
    }
};

app.use(cors(corsOptions));

app.get('/', async (req, res) => {
    const data = await getForexFactoryData();
    res.json(data);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
