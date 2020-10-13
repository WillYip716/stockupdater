//const {sendMail} = require('./reportsender');
const {getStocks} = require('./stockfinder');
var cron = require('node-cron');
let counter = 1;


cron.schedule('* * * * *', () => {
    /* 
        generate your report here then send the report using 
        any reportSender logic that you implemnted email, telegram bot,...
    */
    //sendMail(`hello world ${counter}`, "this is email body it can contain html also");
    console.log("this is counter: " + counter);
    counter++;
});

getStocks();
