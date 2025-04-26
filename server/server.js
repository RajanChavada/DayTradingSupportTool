const express = require('express');
const cheerio = require('cheerio');
const cors = require('cors');
const axios = require('axios');
const puppeteer = require('puppeteer');


const app = express();

require('dotenv').config();
const { Parser } = require('json2csv');
const fs = require('fs');

const API_KEY = process.env.ALPHA_VANTAGE;


// Apply CORS middleware
const corsOptions = {
    origin: ['http://localhost:5173'], // Allow frontend to access backend
    optionsSuccessStatus: 200,
};





const getForexFactoryData = async () => {
    const browser = await puppeteer.launch({ headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'], });
    const page = await browser.newPage();
    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
      );
      await page.setViewport({ width: 1280, height: 800 });
    await page.setExtraHTTPHeaders({
    'Accept-Language': 'en-US,en;q=0.9',
    });

    try {
        console.log('Navigating to site...');
        await page.goto('https://www.forexfactory.com/', {
            waitUntil: 'domcontentloaded',
            timeout: 0,
        });

        console.log('Waiting for table...');
        await page.waitForFunction(() => {
            return document.querySelectorAll('tr.calendar__row[data-event-id]').length > 0;
          }, { timeout: 60000 });
          




        const newsItems = await page.evaluate(() => {
            const rows = document.querySelectorAll('tr.calendar__row[data-event-id]');
            const data = [];
        
            rows.forEach(row => {
                const impact = row.querySelector('.calendar__impact span')?.getAttribute('title');
                let time = row.querySelector('.calendar__time span')?.textContent.trim();
                const currency = row.querySelector('.calendar__currency span')?.textContent.trim();
                const event = row.querySelector('.calendar__event-title')?.textContent.trim();
                const actual = row.querySelector('.calendar__actual span')?.textContent.trim();
                const forcast = row.querySelector('.calendar__forcast span')?.textContent.trim();

                
                // if time is empty set to undefined
                if (!time) time = "Undefined";
                if (impact && (impact.includes('High') || impact.includes('Medium')) && currency.includes('USD')) {
                    data.push({ time, currency, event, impact, actual, forcast });
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

app.get("/api/market-data", async (req, res) => {
    const func = "TIME_SERIES_INTRADAY";
    const symbol = "SPY";  // Or any other symbol
    const interval = "15min";  // Can be changed to '1min', '15min', etc.
    const url = `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&interval=${interval}&extended_hours=true&outputsize=full&datatype=csv&apikey=${API_KEY}`;

    try {
        console.log("Fetching intraday data...");
        const response = await axios.get(url, { responseType: 'text' });  // CSV as text
        const lines = response.data.trim().split("\n");

        if (lines.length < 2 || lines[0].includes("Note")) {
            console.error("Alpha Vantage note or empty response.");
            return res.status(500).json({ error: "Alpha Vantage returned a note or no data." });
        }

        const rows = lines.slice(1).map(line => {
            const values = line.split(",");
            return {
                timestamp: values[0],
                open: values[1],
                high: values[2],
                low: values[3],
                close: values[4],
                volume: values[5],
            };
        });

        const json2csvParser = new Parser({ fields: ["timestamp", "open", "high", "low", "close", "volume"] });
        const csv = json2csvParser.parse(rows);
        fs.writeFileSync('new-data.csv', csv);

        res.send("✅ Market data fetched and CSV saved.");
    } catch (error) {
        console.error("Fetch error:", error.message);
        res.status(500).json({ error: error.message });
    }
});



app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
