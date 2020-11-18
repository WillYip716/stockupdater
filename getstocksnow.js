const {getStocks,getEarningsCalender} = require('./stockfinder');


(async () => {
    let list = ["nio","tsla","ual","sq","pltr",];
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
    
    console.log(output.join("\n"));
    console.log("success");
    
})();
