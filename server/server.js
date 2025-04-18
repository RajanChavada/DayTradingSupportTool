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

app.get("/api/market-data", async(req, res) => { 
    const func = "TIME_SERIES_INTRADAY"; 
    const symbol = "QQQ"; 
    const interval = "60min"; 
    const url = `https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&interval=${interval}&apikey=${API_KEY}`;

    try { 
        const response = await axios.get(url); 
        const rawData = response.data['Time Series (60min)']; 

        if (!rawData) return res.status(500).json({ error: 'Invalid or missing data' });

        const formattedData = Object.entries(rawData).map(([timestamp, values]) => ({
            timestamp,
            open: values['1. open'],
            high: values['2. high'],
            low: values['3. low'],
            close: values['4. close'],
        }));

        const json2csvParser = new Parser(); 
        const csv = json2csvParser.parse(formattedData);


        // save to file 
        fs.writeFileSync('market-data.csv', csv);
        res.send("CSV Saved"); 
    }
    catch(error) {
        res.json(error);
    }
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
