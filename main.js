//const {sendMail} = require('./reportsender');
const {getStocks} = require('./stockfinder');
var cron = require('node-cron');
let counter = 1;

async function stockChanges(){
    /*cron.schedule('* * * * *', () => {
        /* 
            generate your report here then send the report using 
            any reportSender logic that you implemnted email, telegram bot,...
        
        //sendMail(`hello world ${counter}`, "this is email body it can contain html also");
        console.log("this is counter: " + counter);
        counter++;
    });*/
    let list = ["pton","tsla","ual","sq"];
    let dataList = [];
    for (let i = 0; i < list.length; i++) {
        let val = await getStocks(list[i]);
        val.symbol = list[i];
        dataList.push(val);
    }

    for(let j = 0; j<dataList.length;j++){
        let percentChange = 100*(parseFloat(dataList[j].c)-parseFloat(dataList[j].o))/parseFloat(dataList[j].o);
        console.log(dataList[j].symbol + ": " + percentChange.toFixed(2) +"%"); 
        console.log("current: " + dataList[j].c); 
        console.log("open: " + dataList[j].o +  "\n"); 
    }
    
    /*console.log("current: " + data.c);
    console.log("opening: " + data.o);
    console.log(percentChange.toFixed(2) + "%"); */
}

stockChanges();
