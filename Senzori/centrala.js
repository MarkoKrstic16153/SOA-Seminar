var rxjs = require("rxjs");
var express = require("express");
var cors = require("cors");
const ZB = require('zeebe-node');
var redis = require('redis');
const { ZBClient, Duration} = require('zeebe-node')

var app = express();

var redisClient = redis.createClient(); 
redisClient.on('connect', function() {
    console.log("Spreman za Upotrebu!");
});
redisClient.on('error', function (err) {
    console.log('Greska ' + err);
});

const port = 3020;
const zeebeAddres = 'localhost:26500';
const podaciTopic = 'podaci-centrala-klijent';
const notifikacijeTopic = 'notifikacije-centrala-klijent';

let tempBoiler = {};
let tempKlima = {};
let tempOsvezavac = {};
let tempPreciscavac = {};
let tempSijalica = {};
let tempTV = {};

app.use(cors());

const appp = require('express')()

appp.use(cors())
var http = require('http').createServer(appp);

appp.use(express.json());
appp.use(express.urlencoded({extended: true}) );
var io = require('socket.io')(http);
io.on('connection', () => {
    console.log('a user connected');   
  });

  http.listen(4444,() => console.log(`Socket server listening on port 4444!`));

app.listen(port, () => { 
    console.log("Server startovan na portu: " + port + ".");
});

//Zeebe create clent
const zbc = new ZBClient(
    zeebeAddres,
    {
        retry: true,
        maxRetries: -1, // infinite retries
        maxRetryTimeout: Duration.seconds.of(5)
    });
    zbc.on('ready', () => console.log(`Worker connected!`))
    zbc.on('connectionError', () => console.log(`Worker disconnected!`));

//**************BOILER****************
//Zeebe process water worker	
const processWaterTempWorker = zbc.createWorker({
    taskType: 'process-water-temp',
    taskHandler: processWaterTemp,
    onReady: () => console.log(`Worker Process Water Temp connected!`),
    onConnectionError: () => console.log(`Worker Process Water Temp disconnected!`)
})
//hendeler
function processWaterTemp(job, complete, worker) {
    worker.log('Task variables', job.variables)
    tempBoiler = job.variables;
    redisClient.hset("temp-boiler","temp-data",JSON.stringify(tempBoiler));
	complete.success();
}
//Zeebe send water to client
const sendWaterTempToClientWorker = zbc.createWorker({
    taskType: 'send-water-temp-to-client',
    taskHandler: sendWaterTempToClient,
    onReady: () => console.log(`Worker Send Water Temp To Client connected!`),
    onConnectionError: () => console.log(`Worker Send Water Temp To Client disconnected!`)
})
//hendeler
function sendWaterTempToClient(job, complete, worker) {
    worker.log('Task variables', job.variables)
    let payload = job.variables;
    io.emit(podaciTopic, payload);
	complete.success();
}
//Zeebe send hot water notification
const sendHotWaterNotificationClientWorker = zbc.createWorker({
    taskType: 'send-hot-water-notification',
    taskHandler: sendHotWaterNotification,
    onReady: () => console.log(`Worker Send Hot Water Notification connected!`),
    onConnectionError: () => console.log(`Worker Send Hot Water Notification disconnected!`)
})
//hendeler
function sendHotWaterNotification(job, complete, worker) {
    worker.log('Task variables', job.variables)
    let payload = {
        message : "Voda u Boileru ima vrlo visoku temperaturu.",
        telo : job.variables
    };
    io.emit(notifikacijeTopic, payload);
	complete.success();
}
//Zeebe send cold water notification
const sendColdWaterNotificationClientWorker = zbc.createWorker({
    taskType: 'send-cold-water-notification',
    taskHandler: sendColdWaterNotification,
    onReady: () => console.log(`Worker Send Cold Water Notification connected!`),
    onConnectionError: () => console.log(`Worker Send Cold Water Notification disconnected!`)
})
//hendeler
function sendColdWaterNotification(job, complete, worker) {
    worker.log('Task variables', job.variables)
    let payload = {
        message : "Voda u Boileru ima vrlo nisku temperaturu.",
        telo : job.variables
    };
    io.emit(notifikacijeTopic, payload);
	complete.success();
}
//Zeebe send high consumption water notification
const sendHighConsumptionWaterNotificationClientWorker = zbc.createWorker({
    taskType: 'send-high-consumption-notification',
    taskHandler: sendHighConsumptionWaterNotification,
    onReady: () => console.log(`Worker Send High Consuption Water Heater Notification connected!`),
    onConnectionError: () => console.log(`Worker Send High Consuption Water Heater Notification disconnected!`)
})
//hendeler
function sendHighConsumptionWaterNotification(job, complete, worker) {
    worker.log('Task variables', job.variables)
    let payload = {
        message : "Visoka potrosnja elektricne energije bojlera.",
        telo : job.variables
    };
    io.emit(notifikacijeTopic, payload);
	complete.success();
}

//**************KLIMA****************
//Zeebe process klima temp worker	
const processKlimaTempWorker = zbc.createWorker({
    taskType: 'process-klima-temp',
    taskHandler: processKlimaTemp,
    onReady: () => console.log(`Worker Process Klima Temp connected!`),
    onConnectionError: () => console.log(`Worker Process Klima Temp disconnected!`)
})
//hendeler
function processKlimaTemp(job, complete, worker) {
    worker.log('Task variables', job.variables)
    tempKlima = job.variables;
    redisClient.hset("temp-klima","temp-data",JSON.stringify(tempKlima));
	complete.success();
}
//Zeebe send klima temp to client
const sendKlimaTempToClientWorker = zbc.createWorker({
    taskType: 'send-klima-temp-to-client',
    taskHandler: sendKlimaTempToClient,
    onReady: () => console.log(`Worker Send Klima Temp To Client connected!`),
    onConnectionError: () => console.log(`Worker Send Klima Temp To Client disconnected!`)
})
//hendeler
function sendKlimaTempToClient(job, complete, worker) {
    worker.log('Task variables', job.variables)
    let payload = job.variables;
    io.emit(podaciTopic, payload);
	complete.success();
}
//Zeebe send hot room notification
const sendHotRoomNotificationClientWorker = zbc.createWorker({
    taskType: 'send-hot-room-notification',
    taskHandler: sendHotRoomNotification,
    onReady: () => console.log(`Worker Send Hot Room Notification connected!`),
    onConnectionError: () => console.log(`Worker Send Hot Room Notification disconnected!`)
})
//hendeler
function sendHotRoomNotification(job, complete, worker) {
    worker.log('Task variables', job.variables)
    let payload = {
        message : "Vazduh u Sobi ima visoku temperaturu.",
        telo : job.variables
    };
    io.emit(notifikacijeTopic, payload);
	complete.success();
}
//Zeebe send cold room notification
const sendColdRoomNotificationClientWorker = zbc.createWorker({
    taskType: 'send-cold-room-notification',
    taskHandler: sendColdRoomNotification,
    onReady: () => console.log(`Worker Send Cold Room Notification connected!`),
    onConnectionError: () => console.log(`Worker Send Cold Room Notification disconnected!`)
})
//hendeler
function sendColdRoomNotification(job, complete, worker) {
    worker.log('Task variables', job.variables)
    let payload = {
        message : "Vazduh u Sobi ima nisku temperaturu.",
        telo : job.variables
    };
    io.emit(notifikacijeTopic, payload);
	complete.success();
}
//Zeebe send high consumption water notification
const sendHighConsumptionRoomTempNotificationClientWorker = zbc.createWorker({
    taskType: 'send-klima-consumption-notification',
    taskHandler: sendHighConsumptionRoomTempNotification,
    onReady: () => console.log(`Worker Send High Consuption Room Heater Notification connected!`),
    onConnectionError: () => console.log(`Worker Send High Consuption Room Heater Notification disconnected!`)
})
//hendeler
function sendHighConsumptionRoomTempNotification(job, complete, worker) {
    worker.log('Task variables', job.variables)
    let payload = {
        message : "Visoka potrosnja elektricne energije klima uredjaja.",
        telo : job.variables
    };
    io.emit(notifikacijeTopic, payload);
	complete.success();
}

//**************POLLUTION****************
//Zeebe process pollution data worker	
const processPollutionDataWorker = zbc.createWorker({
    taskType: 'process-pollution',
    taskHandler: processPollutionData,
    onReady: () => console.log(`Worker Process Pollution Data connected!`),
    onConnectionError: () => console.log(`Worker Process Pollution Data disconnected!`)
})
//hendeler
function processPollutionData(job, complete, worker) {
    worker.log('Task variables', job.variables)
    tempPreciscavac = job.variables;
    redisClient.hset("temp-pollutoion","temp-data",JSON.stringify(tempPreciscavac));
	complete.success();
}
//Zeebe send pollution data to client
const sendPollutionDataToClientWorker = zbc.createWorker({
    taskType: 'send-pollution-to-client',
    taskHandler: sendPollutionDataToClient,
    onReady: () => console.log(`Worker Send Pollution Data To Client connected!`),
    onConnectionError: () => console.log(`Worker Send Pollution Data To Client disconnected!`)
})
//hendeler
function sendPollutionDataToClient(job, complete, worker) {
    worker.log('Task variables', job.variables)
    let payload = job.variables;
    io.emit(podaciTopic, payload);
	complete.success();
}
//Zeebe send high pollution notification
const sendHighPollutionNotificationClientWorker = zbc.createWorker({
    taskType: 'send-high-pollution-notification',
    taskHandler: sendHighPollutionNotification,
    onReady: () => console.log(`Worker Send High Pollution Notification connected!`),
    onConnectionError: () => console.log(`Worker Send High Pollution Notification disconnected!`)
})
//hendeler
function sendHighPollutionNotification(job, complete, worker) {
    worker.log('Task variables', job.variables)
    let payload = {
        message : "Visoka zagadjenost vazduha u sobi.",
        telo : job.variables
    };
    io.emit(notifikacijeTopic, payload);
	complete.success();
}

//**************HUMIDITY****************
//Zeebe process humidity data worker	
const processHumidityDataWorker = zbc.createWorker({
    taskType: 'process-humidity',
    taskHandler: processHumidityData,
    onReady: () => console.log(`Worker Process Humidity Data connected!`),
    onConnectionError: () => console.log(`Worker Process Humidity Data disconnected!`)
})
//hendeler
function processHumidityData(job, complete, worker) {
    worker.log('Task variables', job.variables)
    tempOsvezavac = job.variables;
    redisClient.hset("temp-humidity","temp-data",JSON.stringify(tempOsvezavac));
	complete.success();
}
//Zeebe send humidity data to client
const sendHumidityDataToClientWorker = zbc.createWorker({
    taskType: 'send-humidity-to-client',
    taskHandler: sendHumidityDataToClient,
    onReady: () => console.log(`Worker Send Humidity Data To Client connected!`),
    onConnectionError: () => console.log(`Worker Send Humidity Data To Client disconnected!`)
})
//hendeler
function sendHumidityDataToClient(job, complete, worker) {
    worker.log('Task variables', job.variables)
    let payload = job.variables;
    io.emit(podaciTopic, payload);
	complete.success();
}
//Zeebe send high humidity notification
const sendHighHumidityNotificationClientWorker = zbc.createWorker({
    taskType: 'send-high-humidity-notification',
    taskHandler: sendHighHumidityNotification,
    onReady: () => console.log(`Worker Send High Humidity Notification connected!`),
    onConnectionError: () => console.log(`Worker Send High Humidity Notification disconnected!`)
})
//hendeler
function sendHighHumidityNotification(job, complete, worker) {
    worker.log('Task variables', job.variables)
    let payload = {
        message : "Vazduh u Sobi ima visoku vlaznost.",
        telo : job.variables
    };
    io.emit(notifikacijeTopic, payload);
	complete.success();
}
//Zeebe send low humidity notification
const sendLowHumidityNotificationClientWorker = zbc.createWorker({
    taskType: 'send-low-humidity-notification',
    taskHandler: sendLowHumidityNotification,
    onReady: () => console.log(`Worker Send Low Humidity Notification connected!`),
    onConnectionError: () => console.log(`Worker Low Cold Humidity Notification disconnected!`)
})
//hendeler
function sendLowHumidityNotification(job, complete, worker) {
    worker.log('Task variables', job.variables)
    let payload = {
        message : "Vazduh u Sobi ima nisku vlaznost.",
        telo : job.variables
    };
    io.emit(notifikacijeTopic, payload);
	complete.success();
}

//**************LIGHTBULB****************
//Zeebe process lightbulb data worker	
const processLightBulbDataWorker = zbc.createWorker({
    taskType: 'process-lightbulb',
    taskHandler: processLightBulbData,
    onReady: () => console.log(`Worker Process LightBulb Data connected!`),
    onConnectionError: () => console.log(`Worker Process LightBulb Data disconnected!`)
})
//hendeler
function processLightBulbData(job, complete, worker) {
    worker.log('Task variables', job.variables)
    tempSijalica = job.variables;
    redisClient.hset("temp-sijalica","temp-data",JSON.stringify(tempSijalica));
	complete.success();
}
//Zeebe send lightbulb data to client
const sendLightBulbDataToClientWorker = zbc.createWorker({
    taskType: 'send-lightbulb-to-client',
    taskHandler: sendLightBulbDataToClient,
    onReady: () => console.log(`Worker Send LightBulb Data To Client connected!`),
    onConnectionError: () => console.log(`Worker Send LightBulb Data To Client disconnected!`)
})
//hendeler
function sendLightBulbDataToClient(job, complete, worker) {
    worker.log('Task variables', job.variables)
    let payload = job.variables;
    io.emit(podaciTopic, payload);
	complete.success();
}

//**************TV****************
//Zeebe process tv data worker	
const processTVDataWorker = zbc.createWorker({
    taskType: 'process-tv',
    taskHandler: processTVData,
    onReady: () => console.log(`Worker Process TV Data connected!`),
    onConnectionError: () => console.log(`Worker TV Pollution Data disconnected!`)
})
//hendeler
function processTVData(job, complete, worker) {
    worker.log('Task variables', job.variables)
    tempTV = job.variables;
    redisClient.hset("temp-tv","temp-data",JSON.stringify(tempTV));
	complete.success();
}
//Zeebe send tv data to client
const sendTVDataToClientWorker = zbc.createWorker({
    taskType: 'send-tv-to-client',
    taskHandler: sendTVDataToClient,
    onReady: () => console.log(`Worker Send TV Data To Client connected!`),
    onConnectionError: () => console.log(`Worker Send TV Data To Client disconnected!`)
})
//hendeler
function sendTVDataToClient(job, complete, worker) {
    worker.log('Task variables', job.variables)
    let payload = job.variables;
    io.emit(podaciTopic, payload);
	complete.success();
}

//END DAY
//Zeebe save temp consumption to database for a day
const saveConsumptionForADayWorker = zbc.createWorker({
    taskType: 'save-data',
    taskHandler: saveData,
    onReady: () => console.log(`Worker Save Data connected!`),
    onConnectionError: () => console.log(`Worker Save Data disconnected!`)
})
//hendeler
function saveData(job, complete, worker) {
    worker.log('Task variables', job.variables)
    redisClient.lpush("dani",JSON.stringify(formatConsumptionForOneDay())); 
	complete.success();
}

function formatConsumptionForOneDay(){
    let totalCons = tempBoiler.potrosnjaUredjaja + tempKlima.potrosnjaUredjaja + tempPreciscavac.potrosnjaUredjaja + tempOsvezavac.potrosnjaUredjaja + tempSijalica.potrosnjaUredjaja + tempTV.potrosnjaUredjaja;
    let data = {
        boiler:tempBoiler.potrosnjaUredjaja,
        klima:tempKlima.potrosnjaUredjaja,
        pollution:tempPreciscavac.potrosnjaUredjaja,
        humidity:tempOsvezavac.potrosnjaUredjaja,
        sijalica:tempSijalica.potrosnjaUredjaja,
        tv:tempTV.potrosnjaUredjaja,
        total:totalCons
    };
    return data;
}
