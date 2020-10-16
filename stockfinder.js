const axios = require('axios');
require("dotenv").config();

async function getStocks(sym){
    /*axios.get('https://finnhub.io/api/v1/quote?symbol='+sym+'&token='+process.env.FINPW).then(res => {
        console.log(res.data);
        return res.data;
    }).catch(error => {
        console.log(error);
    });*/

    try {
        let info = await axios.get('https://finnhub.io/api/v1/quote?symbol='+sym.toUpperCase()+'&token='+process.env.FINPW);
        return info.data;
    } catch (error) {
        console.error(error)
    }
}



module.exports = {getStocks};