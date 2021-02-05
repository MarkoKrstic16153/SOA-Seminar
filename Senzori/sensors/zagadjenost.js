var rxjs = require("rxjs");
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const axios = require('axios');
const ZB = require('zeebe-node');
const { ZBClient, Duration} = require('zeebe-node')

var app = express();

const port = 3003;
const senzor = "Preciscavac";
const zeebeAddres = 'localhost:26500';

app.use(cors());

app.listen(port, () => {
    console.log("Senzor za " + senzor +" startovan na portu: " + port);
  });

  app.get("/", (req, res) => {
    res.send("Hello " + senzor);
  });

const zbc = new ZBClient(
    zeebeAddres,
    {
        retry: true,
        maxRetries: -1, // infinite retries
        maxRetryTimeout: Duration.seconds.of(5)
    });
    zbc.on('ready', () => console.log(`Pollution Worker connected!`))
    zbc.on('connectionError', () => console.log(`Pollution Worker disconnected!`));

    //Zeebe generate pollution data worker	
const generatePollutionDataWorker = zbc.createWorker({
    taskType: 'gen-pollution',
    taskHandler: generatePollutionData,
    onReady: () => console.log(`Worker Generate Pollution Data connected!`),
    onConnectionError: () => console.log(`Worker Generate Pollution Data disconnected!`)
})

//hendeler
function generatePollutionData(job, complete, worker) {
	console.log("GENERISAO POLLUTION DATA");
	worker.log('Task variables', job.variables)
	complete.success();
}

//Zeebe send pollution data to client
const sendPollutionDataToCentralWorker = zbc.createWorker({
    taskType: 'send-pollution-to-central',
    taskHandler: sendPollutionDataToCentral,
    onReady: () => console.log(`Worker Send Pollution Data To Central connected!`),
    onConnectionError: () => console.log(`Worker Send Pollution Data To Central disconnected!`)
})

//hendeler
function sendPollutionDataToCentral(job, complete, worker) {
	console.log("SALJE POLLUTION DATA CENTRALI");
	worker.log('Task variables', job.variables)
	complete.success();
}

//Zeebe turn on worker	
const turnOnWorker = zbc.createWorker({
  taskType: 'turn-pollution-on',
  taskHandler: turnOn,
  onReady: () => console.log(`Worker Turn On connected!`),
  onConnectionError: () => console.log(`Worker Turn On disconnected!`)
})

//hendeler
function turnOn(job, complete, worker) {
  console.log("PALI PRECISCAVAC");
  console.log("***************" + job.variables.commandValue + "********************");
  worker.log('Task variables', job.variables)
  ///ciljnaTemperatura = job.variables.commandValue;
  upaliPreciscavac();
  complete.success();
}

//Zeebe turn off worker
const turnOffWorker = zbc.createWorker({
  taskType: 'turn-pollution-off',
  taskHandler: turnOff,
  onReady: () => console.log(`Worker Turn Off connected!`),
  onConnectionError: () => console.log(`Worker Turn Off disconnected!`)
})

//hendeler
function turnOff(job, complete, worker) {
  console.log("GASI PRECISCAVAC");
  worker.log('Task variables', job.variables)
  ugasiPreciscavac();
  complete.success();
}

//Zeebe clear worker
const clearWorker = zbc.createWorker({
  taskType: 'clear-pollution',
  taskHandler: clearDevice,
  onReady: () => console.log(`Worker Clear Device connected!`),
  onConnectionError: () => console.log(`Worker Clear Device disconnected!`)
})

//hendeler
function clearDevice(job, complete, worker) {
  console.log("CLEAR-UJE POLLUTION");
  worker.log('Task variables', job.variables)
  clear();
  complete.success();
}

  let trenutnaZagadjenost = 50 + Math.random()*400;//pocetna zagadjenost je izmedju 0 i 300 cestica;
  let raste = Math.random()>0.5 ? 1:-1;
  let ukljucen = false;// da li je korisnik upalio preciscavac
  let aktivan = false;//da li cisti ili ne;
  let dozvoljenaZagadjenost = 150;
  let timerRada = 0;
  let minZag = 100;
  let maxZag = 150;
  let koefPotrosnje = 1;

  const timer = rxjs.interval(3000);
  timer.subscribe(()=>{
    console.log(timerRada);
    promeniZagadjenost();
    daLiTrebaDaCisti();
    if(aktivan)
      timerRada+=3;
    //ZEEBE kreira workflow za water temp
    (async () => {
      const zbc = new ZB.ZBClient(zeebeAddres)
      const result = await zbc.createWorkflowInstance('pollution', {
          podatakId: trenutnaZagadjenost + "_id",
          podatakVrednost:trenutnaZagadjenost,
          potrosnjaUredjaja:timerRada * koefPotrosnje,
          stanjeUredjaja:ukljucen,
          tipUredjaja:senzor
      })
    })()
});

  function promeniZagadjenost(){
    if(aktivan == false){
      trenutnaZagadjenost += 0.02*trenutnaZagadjenost*raste;
      raste = Math.random()<0.1 ? -1*raste:raste;
    }
    else{
      trenutnaZagadjenost -= 0.02*trenutnaZagadjenost;
    }
}

function upaliPreciscavac(){
    ukljucen = true;
    daLiTrebaDaCisti();
}

function ugasiPreciscavac(){
    ukljucen = false;
    aktivan = false;
}

function clear(){
  timerRada = 0;
}

function daLiTrebaDaCisti(){
  if(ukljucen){
    if(dozvoljenaZagadjenost < trenutnaZagadjenost*1.05)
        aktivan = true;
    else 
        aktivan = false;
  }
}

