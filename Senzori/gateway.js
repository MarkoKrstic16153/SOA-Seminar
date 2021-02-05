const express = require('express')
const app = express()
var http = require('http').createServer(app);
var cors = require('cors')
const ZB = require('zeebe-node');
const { ZBClient, Duration} = require('zeebe-node');
const { platform } = require('os');
var redis = require('redis');
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: true}) );

const port = 3033;

const commandBoilerCounter = 0;
const commandKlimaCounter = 0;
const commandOsvezavacCounter = 0;
const commandPreciscavacCounter = 0;
const commandSijalicaCounter = 0;
const commandTVCounter = 0;
const commandEndDayCounter = 0;

var redisClient = redis.createClient(); 
redisClient.on('connect', function() {
    console.log("Spreman za Upotrebu!");
});
redisClient.on('error', function (err) {
    console.log('Greska ' + err);
});

const zeebeAddres = 'localhost:26500';
const zbc = new ZBClient(
    zeebeAddres,
    {
        retry: true,
        maxRetries: -1, // infinite retries
        maxRetryTimeout: Duration.seconds.of(5)
    });
    zbc.on('ready', () => console.log(`Worker connected!`))
    zbc.on('connectionError', () => console.log(`Worker disconnected!`));

app.use(cors());

app.listen(port, () => {
    console.log("Gateway startovan na portu: " + port);
  });

  //GATEWAY ENDPOINT
  app.get("/", (req, res) => {
    res.send("Hello World!"); 
  });

  //BOILER ENDPOINT
  app.post("/boiler", (req, res) => {
    let payload = req.body;
    console.log(payload);
    //ZEEBE kreira workflow za boiler command
    (async () => {
        const zbc = new ZB.ZBClient(zeebeAddres)
        const result = await zbc.createWorkflowInstance('boiler-command', {
            commandId: commandBoilerCounter,
            commandValue:payload.vrednostKomande,
            commandType:payload.vrstaKomande
        })
    })()
    res.send("Boiler Command Successfully Received!");
    sendBoilerCommandMessage(commandBoilerCounter);
  });

  //KLIMA ENDPOINT
  app.post("/klima", (req, res) => {
    let payload = req.body;
    console.log(payload);
    //ZEEBE kreira workflow za klima command
    (async () => {
        const zbc = new ZB.ZBClient(zeebeAddres)
        const result = await zbc.createWorkflowInstance('klima-command', {
            commandId: commandKlimaCounter,
            commandValue:payload.vrednostKomande,
            commandType:payload.vrstaKomande
        })
    })()
    res.send("Klima Command Successfully Received!");
    sendKlimaCommandMessage(commandKlimaCounter);
  });

    //OSVEZAVAC ENDPOINT
    app.post("/osvezavac", (req, res) => {
        let payload = req.body;
        console.log(payload);
        //ZEEBE kreira workflow za osvezavac command
        (async () => {
            const zbc = new ZB.ZBClient(zeebeAddres)
            const result = await zbc.createWorkflowInstance('humidity-command', {
                commandId: commandOsvezavacCounter,
                commandValue:payload.vrednostKomande,
                commandType:payload.vrstaKomande
            })
        })()
        res.send("Osvezavac Command Successfully Received!");
        sendOsvezavacCommandMessage(commandOsvezavacCounter);
    });

    //PRECISCAVAC ENDPOINT
    app.post("/preciscavac", (req, res) => {
        let payload = req.body;
        console.log(payload);
        //ZEEBE kreira workflow za preciscavac command
        (async () => {
            const zbc = new ZB.ZBClient(zeebeAddres)
            const result = await zbc.createWorkflowInstance('pollution-command', {
                commandId: commandPreciscavacCounter,
                commandValue:payload.vrednostKomande,
                commandType:payload.vrstaKomande
            })
        })()
        res.send("Preciscavac Command Successfully Received!");
        sendPreciscavacCommandMessage(commandPreciscavacCounter);
    });

    //SIJALICA ENDPOINT
    app.post("/sijalica", (req, res) => {
        let payload = req.body;
        console.log(payload);
        //ZEEBE kreira workflow za sijalica command
        (async () => {
            const zbc = new ZB.ZBClient(zeebeAddres)
            const result = await zbc.createWorkflowInstance('sijalica-command', {
                commandId: commandSijalicaCounter,
                commandValue:payload.vrednostKomande,
                commandType:payload.vrstaKomande
            })
        })()
        res.send("Sijalica Command Successfully Received!");
        sendSijalicaCommandMessage(commandSijalicaCounter);
    });

    //TV ENDPOINT
    app.post("/tv", (req, res) => {
        let payload = req.body;
        console.log(payload);
        //ZEEBE kreira workflow za tv command
        (async () => {
            const zbc = new ZB.ZBClient(zeebeAddres)
            const result = await zbc.createWorkflowInstance('tv-command', {
                commandId: commandTVCounter,
                commandValue:payload.vrednostKomande,
                commandType:payload.vrstaKomande
            })
        })()
        res.send("TV Command Successfully Received!");
        sendTVCommandMessage(commandTVCounter);
    });

    //END DAY ENDPOINT
    app.post("/endday", (req, res) => {
        let payload = req.body;
        console.log(payload);
        //ZEEBE kreira workflow za tv command
        (async () => {
            const zbc = new ZB.ZBClient(zeebeAddres)
            const result = await zbc.createWorkflowInstance('end-day-command', {
                commandId: commandEndDayCounter,
            })
        })()
        res.send("End Day Command Successfully Received!");
        sendEndDayCommandMessage(commandEndDayCounter);
    });

    //STATISTIKA ENDPOINT
    app.get('/statistics', function (req, res) {
        redisClient.lrange("dani",0,-1,(greska,rezultat) => {
            if (greska) {
                console.log(greska);
                throw greska;
            }
            //let objRezultat = JSON.parse(rezultat);
            for(i=0;i<rezultat.length;i++){
                rezultat[i] = JSON.parse(rezultat[i]);
            }
            console.log("Zapamcenji podaci -> " + rezultat);
            res.send(rezultat);
        });
      });

function sendBoilerCommandMessage(commandBoilerCounter){

    zbc.publishMessage({
        correlationKey: commandBoilerCounter,
        name: 'boiler-command-received',
        timeToLive: Duration.seconds.of(10), // seconds
    })
    commandBoilerCounter++;
}

function sendKlimaCommandMessage(commandKlimaCounter){

    zbc.publishMessage({
        correlationKey: commandKlimaCounter,
        name: 'klima-command-received',
        timeToLive: Duration.seconds.of(10), 
    })
    commandKlimaCounter++;
}

function sendOsvezavacCommandMessage(commandOsvezavacCounter){

    zbc.publishMessage({
        correlationKey: commandOsvezavacCounter,
        name: 'humidity-command-received',
        timeToLive: Duration.seconds.of(10), 
    })
    commandOsvezavacCounter++;
}

function sendPreciscavacCommandMessage(commandPreciscavacCounter){

    zbc.publishMessage({
        correlationKey: commandPreciscavacCounter,
        name: 'pollution-command-received',
        timeToLive: Duration.seconds.of(10), 
    })
    commandPreciscavacCounter++;
}

function sendSijalicaCommandMessage(commandSijalicaCounter){

    zbc.publishMessage({
        correlationKey: commandSijalicaCounter,
        name: 'sijalica-command-received',
        timeToLive: Duration.seconds.of(10), 
    })
    commandSijalicaCounter++;
}

function sendTVCommandMessage(commandTVCounter){

    zbc.publishMessage({
        correlationKey: commandTVCounter,
        name: 'tv-command-received',
        timeToLive: Duration.seconds.of(10), 
    })
    commandTVCounter++;
}

function sendEndDayCommandMessage(commandEndDayCounter){

    zbc.publishMessage({
        correlationKey: commandEndDayCounter,
        name: 'end-day-command-received',
        timeToLive: Duration.seconds.of(10), 
    })
    commandEndDayCounter++;
}