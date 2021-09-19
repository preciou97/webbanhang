const axios = require('axios');
const cheerio = require('cheerio');

html = 'https://blog.mita-sneakers.co.jp/';
 axios.get(html)
    .then(function (response) {
        const $ = cheerio.load(response.data);
        $('.featured-image').each((index,element) => {
            console.log($(element).attr('style'));
        })
        
    })
    

