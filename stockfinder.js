const axios = require('axios');
require("dotenv").config();

async function getStocks(sym){
    try {
        let info = await axios.get('https://finnhub.io/api/v1/quote?symbol='+sym.toUpperCase()+'&token='+process.env.FINPW);
        return info.data;
    } catch (error) {
        console.error(error)
    }
}


async function getEarningsCalender(sym){
    var now = new Date().toISOString().slice(0,10);
    var later = new Date();
    later.setDate(later.getDate() + 90);
    later = later.toISOString().slice(0,10);

    try {
        let info = await axios.get('https://finnhub.io/api/v1/calendar/earnings?symbol='+sym.toUpperCase()+'&from='+now+'&to='+later+'&token='+process.env.FINPW);
        let earningsDate = "no dates found in next 90 days";
        if(info.data.earningsCalendar.length){
            earningsDate = info.data.earningsCalendar[0].date;
        }
        return earningsDate;
    } catch (error) {
        console.error(error)
    }
}





module.exports = {getStocks,getEarningsCalender};