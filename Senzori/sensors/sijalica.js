var rxjs = require("rxjs");
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const axios = require('axios');
const ZB = require('zeebe-node');
const { ZBClient, Duration} = require('zeebe-node')

var app = express();

const port = 3005;
const senzor = "Sijalice";
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
    zbc.on('ready', () => console.log(`Lightbulb Worker connected!`))
    zbc.on('connectionError', () => console.log(`Lightbulb Worker disconnected!`));

    //Zeebe generate lightbulb data worker	
const generateLightBulbDataWorker = zbc.createWorker({
    taskType: 'gen-lightbulb',
    taskHandler: generateLightBulbData,
    onReady: () => console.log(`Worker Generate Lightbulb Data connected!`),
    onConnectionError: () => console.log(`Worker Generate Lightbulb Data disconnected!`)
})

//hendeler
function generateLightBulbData(job, complete, worker) {
	console.log("GENERISAO LIGHTBULD DATA");
	worker.log('Task variables', job.variables)
	complete.success();
}

//Zeebe send lightbulb data to central
const sendLightbulbDataToCentralWorker = zbc.createWorker({
    taskType: 'send-lightbulb-to-central',
    taskHandler: sendLightBulbDataToCentral,
    onReady: () => console.log(`Worker Send Lightbulb Data To Central connected!`),
    onConnectionError: () => console.log(`Worker Send Lightbulb Data To Central disconnected!`)
})

//hendeler
function sendLightBulbDataToCentral(job, complete, worker) {
	console.log("SALJE LIGHTBULB DATA");
	worker.log('Task variables', job.variables)
	complete.success();
}

//Zeebe turn one on worker	
const turnOneOnWorker = zbc.createWorker({
  taskType: 'turn-sijalica-on',
  taskHandler: turnOneOn,
  onReady: () => console.log(`Worker Turn One On connected!`),
  onConnectionError: () => console.log(`Worker Turn One On disconnected!`)
})

//hendeler
function turnOneOn(job, complete, worker) {
  console.log("PALI JEDNU SIJALICU");
  console.log("***************" + job.variables.commandValue + "********************");
  worker.log('Task variables', job.variables)
  let indexSijalice = job.variables.commandValue;
  upaliSijalicu(indexSijalice);
  complete.success();
}

//Zeebe turn one off worker
const turnOneOffWorker = zbc.createWorker({
  taskType: 'turn-sijalica-off',
  taskHandler: turnOneOff,
  onReady: () => console.log(`Worker Turn One Off connected!`),
  onConnectionError: () => console.log(`Worker Turn One Off disconnected!`)
})

//hendeler
function turnOneOff(job, complete, worker) {
  console.log("GASI JEDNU SIJALICU");
  worker.log('Task variables', job.variables)
  let indexSijalice = job.variables.commandValue;
  ugasiSijalicu(indexSijalice);
  complete.success();
}

//Zeebe turn all on worker	
const turnAllOnWorker = zbc.createWorker({
  taskType: 'turn-all-sijalica-on',
  taskHandler: turnAllOn,
  onReady: () => console.log(`Worker Turn All On connected!`),
  onConnectionError: () => console.log(`Worker Turn All On disconnected!`)
})

//hendeler
function turnAllOn(job, complete, worker) {
  console.log("PALI SVE SIJALICE");
  console.log("***************" + job.variables.commandValue + "********************");
  worker.log('Task variables', job.variables)
  upaliSveSijalice()
  complete.success();
}

//Zeebe turn all off worker
const turnAllOffWorker = zbc.createWorker({
  taskType: 'turn-all-sijalica-off',
  taskHandler: turnAllOff,
  onReady: () => console.log(`Worker Turn All Off connected!`),
  onConnectionError: () => console.log(`Worker Turn All Off disconnected!`)
})

//hendeler
function turnAllOff(job, complete, worker) {
  console.log("GASI BOILER");
  worker.log('Task variables', job.variables)
  ugasiSveSijalice()
  complete.success();
}

//Zeebe clear worker
const clearWorker = zbc.createWorker({
  taskType: 'clear-lightbulbs',
  taskHandler: clearDevice,
  onReady: () => console.log(`Worker Clear Device connected!`),
  onConnectionError: () => console.log(`Worker Clear Device disconnected!`)
})

//hendeler
function clearDevice(job, complete, worker) {
  console.log("CLEAR-UJE SIJALICE");
  worker.log('Task variables', job.variables)
  clear();
  complete.success();
}

  let timerRada = 0;
  let brojSijalica = 0;
  let koefPotrosnje = 0.1;
  let nizStanjaSijalica = [0,0,0,0,0,0];

    const timer = rxjs.interval(3000);
    timer.subscribe(()=>{
    console.log(timerRada);
    if(brojSijalica>0){
      timerRada+=3*brojSijalica;
    }
    (async () => {
      const zbc = new ZB.ZBClient(zeebeAddres)
      const result = await zbc.createWorkflowInstance('lightbulb', {
          podatakId: timerRada + " " + brojSijalica + "_id",
          podatakVrednost:timerRada + " " + brojSijalica,
          potrosnjaUredjaja:timerRada * koefPotrosnje,
          stanjeUredjaja:nizStanjaSijalica,
          tipUredjaja:senzor
      })
    })()

});

function upaliSijalicu(indexSijalice){
    if(brojSijalica<6 && nizStanjaSijalica[indexSijalice] === 0)
        brojSijalica++;
    nizStanjaSijalica[indexSijalice] = 1;
}

function ugasiSijalicu(indexSijalice){
    if(brojSijalica>0 && nizStanjaSijalica[indexSijalice] === 1)
        brojSijalica--;
    nizStanjaSijalica[indexSijalice] = 0;
}

function upaliSveSijalice(){
  brojSijalica = 6;
  nizStanjaSijalica = [1,1,1,1,1,1];
}

function ugasiSveSijalice(){
  brojSijalica = 0;
  nizStanjaSijalica = [0,0,0,0,0,0];
}

function clear(){
  timerRada = 0;
}
