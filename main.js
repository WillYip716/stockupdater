const {sendMail} = require('./reportsender');
const {getStocks,getEarningsCalender} = require('./stockfinder');
var cron = require('node-cron');

async function stockChanges(){
    cron.schedule('0 14 * * 1-5', async () => {
        
        let now = new Date().toISOString().slice(0,10);
        let list = ["pton","tsla","ual","sq"];
        let dataList = [];
        let output = [];

        for (let i = 0; i < list.length; i++) {
            let val = await getStocks(list[i]);
            let calender = await getEarningsCalender(list[i]);
            val.symbol = list[i].toUpperCase();
            val.nextearnings = calender;
            dataList.push(val);
        }

        for(let j = 0; j<dataList.length;j++){
            let percentChange = 100*(parseFloat(dataList[j].c)-parseFloat(dataList[j].o))/parseFloat(dataList[j].o);
            output.push(dataList[j].symbol + ": " + percentChange.toFixed(2) +"%"); 
            output.push("current: " + dataList[j].c); 
            output.push("open: " + dataList[j].o); 
            output.push("next earnings date: " + dataList[j].nextearnings +  "\n");
        }
        
        sendMail(`Stock Reports ${now}`, "<p style='white-space:pre-wrap;'>" + output.join("\n") + "</p>");
        console.log("success");
    },{
        timezone:"America/Los_Angeles",
    });
    
}

stockChanges();
