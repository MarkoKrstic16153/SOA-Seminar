var rxjs = require("rxjs");
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const axios = require('axios');
var app = express();
const ZB = require('zeebe-node');
const { ZBClient, Duration} = require('zeebe-node')

const port = 3002;
const senzor = "Klima";
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
    zbc.on('ready', () => console.log(`Klima Worker connected!`))
    zbc.on('connectionError', () => console.log(`Klima Worker disconnected!`));

    //Zeebe generate klima temp worker	
const generateKlimaTemperatureWorker = zbc.createWorker({
    taskType: 'gen-klima-temp',
    taskHandler: generateKlimaTemperature,
    onReady: () => console.log(`Worker Generate Klima Temp connected!`),
    onConnectionError: () => console.log(`Worker Generate Klima Temp disconnected!`)
})

//hendeler
function generateKlimaTemperature(job, complete, worker) {
	console.log("GENERISAO KLIMA TEMP");
	worker.log('Task variables', job.variables)
	complete.success();
}

//Zeebe send Klima temp to client
const sendKlimaTempToCentralWorker = zbc.createWorker({
    taskType: 'send-klima-temp-to-central',
    taskHandler: sendKlimaTempToCentral,
    onReady: () => console.log(`Worker Send Klima Temp To Central connected!`),
    onConnectionError: () => console.log(`Worker Send Klima Temp To Central disconnected!`)
})

//hendeler
function sendKlimaTempToCentral(job, complete, worker) {
	console.log("SALJE KLIMA TEMP CENTRALI");
	worker.log('Task variables', job.variables)
	complete.success();
}

//Zeebe turn on worker	
const turnOnWorker = zbc.createWorker({
    taskType: 'turn-klima-on',
    taskHandler: turnOn,
    onReady: () => console.log(`Worker Turn On connected!`),
    onConnectionError: () => console.log(`Worker Turn On disconnected!`)
})

//hendeler
function turnOn(job, complete, worker) {
    console.log("PALI KLIMU");
    console.log("***************" + job.variables.commandValue + "********************");
    worker.log('Task variables', job.variables)
    ciljnaTemperatura = job.variables.commandValue;
    upaliKlimu();
    complete.success();
}

//Zeebe turn off worker
const turnOffWorker = zbc.createWorker({
    taskType: 'turn-klima-off',
    taskHandler: turnOff,
    onReady: () => console.log(`Worker Turn Off connected!`),
    onConnectionError: () => console.log(`Worker Turn Off disconnected!`)
})

//hendeler
function turnOff(job, complete, worker) {
    console.log("GASI KLIMU");
    worker.log('Task variables', job.variables)
    ugasiKlimu();
    complete.success();
}

//Zeebe clear worker
const clearWorker = zbc.createWorker({
    taskType: 'clear-klima',
    taskHandler: clearDevice,
    onReady: () => console.log(`Worker Clear Device connected!`),
    onConnectionError: () => console.log(`Worker Clear Device disconnected!`)
})

//hendeler
function clearDevice(job, complete, worker) {
    console.log("CLEAR-UJE KLIMU");
    worker.log('Task variables', job.variables)
    clear();
    complete.success();
}

let trenutnaTemperatura = 10 + Math.random()*20;//pocetna temperatura je izmedju 10 i 30 stepeni;
let raste = Math.random()>0.5 ? true:false;// pocetno biramo rand trend temperature;
let ukljucen = false;//da li radi ili ne;
let aktivan = false;//da li greje ili ne;
let ciljnaTemperatura = -999;
let timerRada = 0;
let minTemp = 25;
let maxTemp = 25;
let koefPotrosnje = 4;

const timer = rxjs.interval(2000);
timer.subscribe(()=>{
    console.log(timerRada);
    promeniTemperaturu();
    daLiTrebaDaAktivna();
    if(aktivan)
    timerRada+=3;
});

function promeniTemperaturu(){
    if(raste)
        trenutnaTemperatura++;
    else
        trenutnaTemperatura--;
    if(aktivan == false)
        raste = Math.random()<0.1 ? !raste:raste;
    //ZEEBE kreira workflow za klima temp
    (async () => {
        const zbc = new ZB.ZBClient(zeebeAddres)
        const result = await zbc.createWorkflowInstance('klima-temp', {
            podatakId: trenutnaTemperatura + "_id",
            podatakVrednost:trenutnaTemperatura,
            potrosnjaUredjaja:timerRada * koefPotrosnje,
            stanjeUredjaja:ukljucen,
            tipUredjaja:senzor
        })
    })()
}

function odrediTrend(novaCiljnaTemperatura){
    if(novaCiljnaTemperatura > trenutnaTemperatura)
        raste = true;
    else
        raste = false;
}

function upaliKlimu(){
    ukljucen = true;
    //odrediTrend(ciljnaTemperatura);
    daLiTrebaDaAktivna();
}

function ugasiKlimu(){
    ukljucen = false;
    aktivan = false;
}

function clear(){
    timerRada = 0;
}

function daLiTrebaDaAktivna(){
    if(ukljucen == true){
        if(aktivan == false){
            console.log("Ciljna" + ciljnaTemperatura)
         if (trenutnaTemperatura > (ciljnaTemperatura - -1*3)){
            console.log("Aktiviram Hladjenje!")
            aktivan = true;
            raste = false;
        }
        else if (trenutnaTemperatura < (ciljnaTemperatura - 3)){
            console.log("Aktiviram Grejanje!")
            aktivan = true;
            raste = true;
        }
    }
        else if((trenutnaTemperatura > (ciljnaTemperatura - 1)) && (trenutnaTemperatura  < (ciljnaTemperatura - -1*1)) && aktivan == true){
            console.log("DeAktiviram Klimu!");
            aktivan = false;
        }
    }
}
