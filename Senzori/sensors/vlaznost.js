var rxjs = require("rxjs");
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const axios = require('axios');
const ZB = require('zeebe-node');
const { ZBClient, Duration} = require('zeebe-node')

var app = express();

const port = 3004;
const senzor = "Osvezavac";
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
    zbc.on('ready', () => console.log(`Humidity Worker connected!`))
    zbc.on('connectionError', () => console.log(`Humidity Worker disconnected!`));

    //Zeebe generate humidity data worker	
const generateHumidityDataWorker = zbc.createWorker({
    taskType: 'gen-humidity',
    taskHandler: generateHumidityData,
    onReady: () => console.log(`Worker Generate Humidity Data connected!`),
    onConnectionError: () => console.log(`Worker Humidity Data Temp disconnected!`)
})

//hendeler
function generateHumidityData(job, complete, worker) {
	console.log("GENERISAO HIMIDITY DATA");
	worker.log('Task variables', job.variables)
	complete.success();
}

//Zeebe send humidity data to central
const sendHumidityDataToCentralWorker = zbc.createWorker({
    taskType: 'send-humidity-to-central',
    taskHandler: sendHumidityDataToCentral,
    onReady: () => console.log(`Worker Send Humidity Data To Central connected!`),
    onConnectionError: () => console.log(`Worker Send Humidity Data To Central disconnected!`)
})

//hendeler
function sendHumidityDataToCentral(job, complete, worker) {
	console.log("SALJE HUMIDITY DATA CENTRALI");
	worker.log('Task variables', job.variables)
	complete.success();
}

//Zeebe turn on worker	
const turnOnWorker = zbc.createWorker({
    taskType: 'turn-humidity-on',
    taskHandler: turnOn,
    onReady: () => console.log(`Worker Turn On connected!`),
    onConnectionError: () => console.log(`Worker Turn On disconnected!`)
  })
  
  //hendeler
  function turnOn(job, complete, worker) {
    console.log("PALI OSVEZAVAC");
    console.log("***************" + job.variables.commandValue + "********************");
    worker.log('Task variables', job.variables)
    ciljnaVlaznost = job.variables.commandValue;
    upaliVlaznost();
    complete.success();
  }
  
  //Zeebe turn off worker
  const turnOffWorker = zbc.createWorker({
    taskType: 'turn-humidity-off',
    taskHandler: turnOff,
    onReady: () => console.log(`Worker Turn Off connected!`),
    onConnectionError: () => console.log(`Worker Turn Off disconnected!`)
  })
  
  //hendeler
  function turnOff(job, complete, worker) {
    console.log("GASI OSVEZAVAC");
    worker.log('Task variables', job.variables)
    ugasiVlaznost();
    complete.success();
  }

  //Zeebe clear worker
const clearWorker = zbc.createWorker({
    taskType: 'clear-humidity',
    taskHandler: clearDevice,
    onReady: () => console.log(`Worker Clear Device connected!`),
    onConnectionError: () => console.log(`Worker Clear Device disconnected!`)
})

//hendeler
function clearDevice(job, complete, worker) {
    console.log("CLEAR-UJE HUMIDITY");
    worker.log('Task variables', job.variables)
    clear();
    complete.success();
}

let trenutnaVlaznost = /*20 + Math.random()*40*/ 13;//pocetna vlaznost je izmedju 20 i 60 procenata;
let raste = Math.random()>0.5 ? true:false;// pocetno biramo rand trend vlaznosti;
let ukljucen = false;//da li radi ili ne;
let aktivan = false;//da li regulise vlagu ili ne;
let ciljnaVlaznost = -999;
let timerRada = 0;
let minVlaz = 50;
let maxVlaz = 50;
let koefPotrosnje = 1.4;

const timer = rxjs.interval(2000);
timer.subscribe(()=>{
    console.log(timerRada);
    promeniVlaznost();
    daLiTrebaDaAktivna();
    if(aktivan)
    timerRada+=3;
    (async () => {
        const zbc = new ZB.ZBClient(zeebeAddres)
        const result = await zbc.createWorkflowInstance('humidity', {
            podatakId: trenutnaVlaznost + "_id",
            podatakVrednost:trenutnaVlaznost,
            potrosnjaUredjaja:timerRada * koefPotrosnje,
            stanjeUredjaja:ukljucen,
            tipUredjaja:senzor
        })
      })()
});

function promeniVlaznost(){
    if(raste)
        trenutnaVlaznost++;
    else
        trenutnaVlaznost--;
    if(aktivan == false)
        raste = Math.random()<0.1 ? !raste:raste;
}

function upaliVlaznost(){
    ukljucen = true;
    daLiTrebaDaAktivna();
}

function ugasiVlaznost(){
    ukljucen = false;
    aktivan = false;
}

function clear(){
    timerRada = 0;
}

function daLiTrebaDaAktivna(){
    if(ukljucen == true){
        if(aktivan == false){
            console.log("Ciljna" + ciljnaVlaznost)
         if (trenutnaVlaznost > (ciljnaVlaznost - -1*3)){
            console.log("Aktiviram Susenje!")
            aktivan = true;
            raste = false;
        }
        else if (trenutnaVlaznost < (ciljnaVlaznost - 3)){
            console.log("Aktiviram Vlazenje!")
            aktivan = true;
            raste = true;
        }
    }
        else if((trenutnaVlaznost > (ciljnaVlaznost - 1)) && (trenutnaVlaznost  < (ciljnaVlaznost - -1*1)) && aktivan == true){
            console.log("DeAktiviram Osvezavac!");
            aktivan = false;
        }
    }
}
