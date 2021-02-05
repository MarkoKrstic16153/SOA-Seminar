var rxjs = require("rxjs");
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const axios = require('axios');
const ZB = require('zeebe-node');
const { ZBClient, Duration} = require('zeebe-node')

var app = express();

const port = 3006;
const senzor = "TV";
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
    zbc.on('ready', () => console.log(`Tv Worker connected!`))
    zbc.on('connectionError', () => console.log(`Tv Worker disconnected!`));

    //Zeebe generate tv data worker	
const generateTVDataWorker = zbc.createWorker({
    taskType: 'gen-tv',
    taskHandler: generateTVData,
    onReady: () => console.log(`Worker Generate TV Data connected!`),
    onConnectionError: () => console.log(`Worker Generate TV Data disconnected!`)
})

//hendeler
function generateTVData(job, complete, worker) {
	console.log("GENERISAO TV Data");
	worker.log('Task variables', job.variables)
	complete.success();
}

//Zeebe send tv data to central
const sendTVDataToCentralWorker = zbc.createWorker({
    taskType: 'send-tv-to-central',
    taskHandler: sendTVDataToCentral,
    onReady: () => console.log(`Worker Send TV Data To Central connected!`),
    onConnectionError: () => console.log(`Worker Send TV Data To Central disconnected!`)
})

//hendeler
function sendTVDataToCentral(job, complete, worker) {
	console.log("SALJE TV DATA CENTRALI");
	worker.log('Task variables', job.variables)
	complete.success();
}

//Zeebe turn on worker	
const turnOnWorker = zbc.createWorker({
  taskType: 'turn-tv-on',
  taskHandler: turnOn,
  onReady: () => console.log(`Worker Turn On connected!`),
  onConnectionError: () => console.log(`Worker Turn On disconnected!`)
})

//hendeler
function turnOn(job, complete, worker) {
  console.log("PALI TV");
  console.log("***************" + job.variables.commandValue + "********************");
  worker.log('Task variables', job.variables)
  ///ciljnaTemperatura = job.variables.commandValue;
  upaliTv();
  complete.success();
}

//Zeebe turn off worker
const turnOffWorker = zbc.createWorker({
  taskType: 'turn-tv-off',
  taskHandler: turnOff,
  onReady: () => console.log(`Worker Turn Off connected!`),
  onConnectionError: () => console.log(`Worker Turn Off disconnected!`)
})

//hendeler
function turnOff(job, complete, worker) {
  console.log("GASI TV");
  worker.log('Task variables', job.variables)
  ugasiTv();
  complete.success();
}

//Zeebe promeni kanal worker
const changeChannelWorker = zbc.createWorker({
  taskType: 'change-channel',
  taskHandler: changeChannel,
  onReady: () => console.log(`Worker Promeni Kanal connected!`),
  onConnectionError: () => console.log(`Worker Promeni Kanal disconnected!`)
})

//hendeler
function changeChannel(job, complete, worker) {
  console.log("MENJA KANAL");
  worker.log('Task variables', job.variables)
  let noviKanal = job.variables.commandValue;
  promeniKanal(noviKanal);
  complete.success();
}

//Zeebe dodaj kanal worker
const addChannelWorker = zbc.createWorker({
  taskType: 'add-channel',
  taskHandler: addNewChannel,
  onReady: () => console.log(`Worker Dodaj Kanal connected!`),
  onConnectionError: () => console.log(`Worker Dodaj Kanal disconnected!`)
})

//hendeler
function addNewChannel(job, complete, worker) {
  console.log("DODAJE KANAL");
  worker.log('Task variables', job.variables)
  let kanalKojSeDodaje = job.variables.commandValue;
  dodajNoviKanal(kanalKojSeDodaje);
  complete.success();
}

//Zeebe clear worker
const clearWorker = zbc.createWorker({
  taskType: 'clear-tv',
  taskHandler: clearDevice,
  onReady: () => console.log(`Worker Clear Device connected!`),
  onConnectionError: () => console.log(`Worker Clear Device disconnected!`)
})

//hendeler
function clearDevice(job, complete, worker) {
  console.log("CLEAR-UJE TV");
  worker.log('Task variables', job.variables)
  clear();
  complete.success();
}

  let ukljucen = false;
  let timerRada = 0;
  let inicijalniBrojKanala = 10;
  let koefPotrosnje = 0.3;
  let trenutniKanalIndex = -1;
  let moguciKanali =[];
  let trenutniKanal = "";
  dodajStartneKanale(moguciKanali);


    const timer = rxjs.interval(3000);
    timer.subscribe(()=>{
    console.log(timerRada);
    if(ukljucen){
      timerRada+=3;
    }
    (async () => {
      if(this.trenutniKanalIndex != -1 && this.ukljucen == true){
          this.trenutniKanal = this.moguciKanali[trenutniKanal];
      }
      const zbc = new ZB.ZBClient(zeebeAddres)
      const result = await zbc.createWorkflowInstance('tv', {
            podatakId: trenutniKanal + timerRada + "_id",
            podatakVrednost:trenutniKanalIndex + " " + trenutniKanal,
            potrosnjaUredjaja:timerRada * koefPotrosnje,
            stanjeUredjaja:ukljucen,
            tipUredjaja:senzor,
            kanali:moguciKanali
        })
    })()
});

function upaliTv(){
    ukljucen = true;
    trenutniKanalIndex = 1;
    trenutniKanal = moguciKanali[0];
}

function ugasiTv(){
    ukljucen = false;
}

function clear(){
  timerRada = 0;
}

function promeniKanal(noviKanal){
  if(ukljucen == true && noviKanal <= inicijalniBrojKanala && noviKanal > 0){
    trenutniKanalIndex = noviKanal - 1;
    trenutniKanal =  moguciKanali[trenutniKanalIndex];
  }
}

function dodajNoviKanal(noviKanal){
  moguciKanali.push(noviKanal);
  inicijalniBrojKanala++;
  console.log(inicijalniBrojKanala);
  console.log(moguciKanali);
}

function dodajStartneKanale(moguciKanali){
  moguciKanali.push("History 1");
  moguciKanali.push("History 2");
  moguciKanali.push("Nature");
  moguciKanali.push("National Geographic");
  moguciKanali.push("Animal Planet");
  moguciKanali.push("Discovery");
  moguciKanali.push("Explorer");
  moguciKanali.push("Euro Sport");
  moguciKanali.push("Arena Sport");
  moguciKanali.push("Sport Klub");
}
