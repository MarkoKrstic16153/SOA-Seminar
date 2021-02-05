var rxjs = require("rxjs");
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const axios = require('axios');
const ZB = require('zeebe-node');
const { ZBClient, Duration} = require('zeebe-node')

var app = express();

const port = 3001;
const senzor = "Boiler";
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
    zbc.on('ready', () => console.log(`Boiler Worker connected!`))
    zbc.on('connectionError', () => console.log(`Boiler Worker disconnected!`));

    //Zeebe generate water temp worker	
const generateWaterTemperatureWorker = zbc.createWorker({
    taskType: 'gen-water-temp',
    taskHandler: generateWaterTemperature,
    onReady: () => console.log(`Worker Generate Water Temp connected!`),
    onConnectionError: () => console.log(`Worker Generate Water Temp disconnected!`)
})

//hendeler
function generateWaterTemperature(job, complete, worker) {
	console.log("GENERISAO VODU");
	worker.log('Task variables', job.variables)
	complete.success();
}

//Zeebe send water temp to central
const sendWaterTempToCentralWorker = zbc.createWorker({
    taskType: 'send-water-temp-to-central',
    taskHandler: sendWaterTempToCentral,
    onReady: () => console.log(`Worker Send Water Temp To Central connected!`),
    onConnectionError: () => console.log(`Worker Send Water Temp To Central disconnected!`)
})

//hendeler
function sendWaterTempToCentral(job, complete, worker) {
	console.log("SALJE VODU CENTRALI");
	worker.log('Task variables', job.variables)
	complete.success();
}

//Zeebe turn on worker	
const turnOnWorker = zbc.createWorker({
    taskType: 'turn-boiler-on',
    taskHandler: turnOn,
    onReady: () => console.log(`Worker Turn On connected!`),
    onConnectionError: () => console.log(`Worker Turn On disconnected!`)
})

//hendeler
function turnOn(job, complete, worker) {
    console.log("PALI BOILER");
    console.log("***************" + job.variables.commandValue + "********************");
    worker.log('Task variables', job.variables)
    ciljnaTemperatura = job.variables.commandValue;
    upaliBoiler();
    complete.success();
}

//Zeebe turn off worker
const turnOffWorker = zbc.createWorker({
    taskType: 'turn-boiler-off',
    taskHandler: turnOff,
    onReady: () => console.log(`Worker Turn Off connected!`),
    onConnectionError: () => console.log(`Worker Turn Off disconnected!`)
})

//hendeler
function turnOff(job, complete, worker) {
    console.log("GASI BOILER");
    worker.log('Task variables', job.variables)
    ugasiBoiler();
    complete.success();
}

//Zeebe clear worker
const clearWorker = zbc.createWorker({
    taskType: 'clear-boiler',
    taskHandler: clearDevice,
    onReady: () => console.log(`Worker Clear Device connected!`),
    onConnectionError: () => console.log(`Worker Clear Device disconnected!`)
})

//hendeler
function clearDevice(job, complete, worker) {
    console.log("CLEAR-UJE BOILER");
    worker.log('Task variables', job.variables)
    clear();
    complete.success();
}


let trenutnaTemperatura = 20 + Math.random()*20;//pocetna temperatura vode je izmedju 20 i 40 stepeni;
let ukljucen = true;// da li je korisnik upalio boiler
let aktivan = false;//da li greje ili ne;
let dostigaoMax = false;
let ciljnaTemperatura = /*-999*/70;
let timerRada = 0;
let koefPotrosnje = 6;

const timer = rxjs.interval(3000);
timer.subscribe(()=>{
    console.log(timerRada);
    promeniTemperaturu();
    if(aktivan)
        timerRada+=3;                                                  
});

function promeniTemperaturu(){
    daLiTrebaDaGreje();
    if(aktivan)
        trenutnaTemperatura++;
    else if (trenutnaTemperatura > 8)
        trenutnaTemperatura--;
    //ZEEBE kreira workflow za water temp
    (async () => {
        const zbc = new ZB.ZBClient(zeebeAddres)
        const result = await zbc.createWorkflowInstance('water-temp', {
            podatakId: trenutnaTemperatura + "_id",
            podatakVrednost:trenutnaTemperatura,
            potrosnjaUredjaja:timerRada * koefPotrosnje,
            stanjeUredjaja:ukljucen,
            tipUredjaja:senzor
        })
    })()
}

function upaliBoiler(){
    ukljucen = true;
    daLiTrebaDaGreje();
}

function ugasiBoiler(){
    aktivan = false;
    ukljucen = false;
    dostigaoMax = false;
}

function clear(){
    timerRada = 0;
}

function daLiTrebaDaGreje(){
    if(ukljucen == true){
        if(ciljnaTemperatura <= trenutnaTemperatura){
            aktivan = false;
            dostigaoMax = true;
        }
        else if (trenutnaTemperatura > ciljnaTemperatura * 0.94 && trenutnaTemperatura < ciljnaTemperatura){//oko max temp
            if(dostigaoMax == false)
                aktivan = true;
            else 
                aktivan = false;
        }
        else if(ciljnaTemperatura > trenutnaTemperatura + trenutnaTemperatura*0.05){
            aktivan = true;
            dostigaoMax = false;
        }   
    } 
}
