const express = require('express');
const cheerio = require('cheerio');
const cors = require('cors');
const axios = require('axios');

const app = express();




// Apply CORS middleware
const corsOptions = {
    origin: ['http://localhost:5173'], // Allow frontend to access backend
    optionsSuccessStatus: 200,
};



const getForexFactoryData = async () => { 
    try {
    const url = "https://www.forexfactory.com/"; 
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);   

    const news = []; 
    $('.calendar__table tr').each((index, element) => {  
        const impact = $(element).find('calendar__impact').attr('class'); 
        const isHighImpact = impact && (impact.includes('High Impact Expected') || impact.includes('Medium Impact Expected'));

        if (isHighImpact) {
            const time = $(element).find('.time').text().trim();
            const currency = $(element).find('.currency').text().trim(); 
            const event = $(element).find('.event').text().trim();

            newsItems.push({ time, currency, event, impact });
        }
    }); 

    return newsItems
} catch (error) {
    console.log(error);
    return [];
}

};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    const data = getForexFactoryData();
    res.json(data);
    res.send(data);
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
