const axios = require('axios');
require("dotenv").config();

async function getStocks(){
    axios.get('https://finnhub.io/api/v1/quote?symbol=AAPL&token='+process.env.FINPW).then(res => {
        console.log(res.data);
    }).catch(error => {
        console.log(error);
    });
}



module.exports = {getStocks};