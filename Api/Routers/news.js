const express = require("express");
const cheerio = require('cheerio');
const axios = require('axios');
const router = express.Router();



const urlNews = "https://www.kore.co.il/flashNews";

router.get('', ((req, res) => {
    const ArrNews = [];
    axios.get(urlNews).then((data) => {

        const $ = cheerio.load(data.data);
        $('p.releaseDate').each((r, e) => {

            ArrNews.push({ time: $(e).text() })

        });
        $('p.flash').each((r, e) => {
            ArrNews[r] = { ...ArrNews[r], data: $(e).text() }

        });


    }).then(() => {

        return res.json({ News: ArrNews })
    })

}))
module.exports = router;