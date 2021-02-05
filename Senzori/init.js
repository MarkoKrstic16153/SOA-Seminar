var rxjs = require("rxjs");
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const axios = require('axios');
const ZB = require('zeebe-node');
const { ZBClient, Duration} = require('zeebe-node')

var app = express();

const initServerPort = 3034;
const zeebeAddres = 'localhost:26500';

const boilerBMPNPath = './BPMN_Workflows/boiler.bpmn';


const klimaBMPNPath = './BPMN_Workflows/klima.bpmn';
const preciscavacBMPNPath = './BPMN_Workflows/zagadjenost.bpmn';
const vlaznostBMPNPath = './BPMN_Workflows/vlaznost.bpmn';
const sijalicaBMPNPath = './BPMN_Workflows/sijalice.bpmn';
const tvBMPNPath = './BPMN_Workflows/tv.bpmn';

const boilerCommandsBMPNPath = './BPMN_Workflows/boiler-command.bpmn';
const klimaCommandsBMPNPath = './BPMN_Workflows/klima-command.bpmn';
const preciscavacCommandsBMPNPath = './BPMN_Workflows/zagadjenost-command.bpmn';
const vlaznostCommandsBMPNPath = './BPMN_Workflows/vlaznost-command.bpmn';
const sijalicaCommandsBMPNPath = './BPMN_Workflows/sijalice-command.bpmn';
const tvCommandsBMPNPath = './BPMN_Workflows/tv-command.bpmn';

const noviDanBMPNPath = './BPMN_Workflows/novi-dan.bpmn';

app.use(cors());

app.listen(initServerPort, () => {
    console.log("Init server startovan na portu: " + initServerPort);
});

//get topology
void (async () => {
	const zbc = new ZB.ZBClient(zeebeAddres)
	const topology = await zbc.topology()
    console.log(JSON.stringify(topology, null, 2))
})();

//Zeeebe deploy data workflows
void (async () => {
	const zbc = new ZB.ZBClient() // localhost:26500 || ZEEBE_GATEWAY_ADDRESS

	const res = await zbc.deployWorkflow(boilerBMPNPath)
	console.log(res)
})();
void (async () => {
	const zbc = new ZB.ZBClient()

	const res = await zbc.deployWorkflow(klimaBMPNPath)
	console.log(res)
})();
void (async () => {
	const zbc = new ZB.ZBClient()

	const res = await zbc.deployWorkflow(preciscavacBMPNPath)
	console.log(res)
})();
void (async () => {
	const zbc = new ZB.ZBClient()

	const res = await zbc.deployWorkflow(vlaznostBMPNPath)
	console.log(res)
})();
void (async () => {
	const zbc = new ZB.ZBClient()

	const res = await zbc.deployWorkflow(sijalicaBMPNPath)
	console.log(res)
})();
void (async () => {
	const zbc = new ZB.ZBClient()

	const res = await zbc.deployWorkflow(tvBMPNPath)
	console.log(res)
})();

//Zeeebe deploy command workflows
void (async () => {
	const zbc = new ZB.ZBClient()

	const res = await zbc.deployWorkflow(boilerCommandsBMPNPath)
	console.log(res)
})();
void (async () => {
	const zbc = new ZB.ZBClient()

	const res = await zbc.deployWorkflow(klimaCommandsBMPNPath)
	console.log(res)
})();
void (async () => {
	const zbc = new ZB.ZBClient()

	const res = await zbc.deployWorkflow(preciscavacCommandsBMPNPath)
	console.log(res)
})();
void (async () => {
	const zbc = new ZB.ZBClient()

	const res = await zbc.deployWorkflow(vlaznostCommandsBMPNPath)
	console.log(res)
})();
void (async () => {
	const zbc = new ZB.ZBClient()

	const res = await zbc.deployWorkflow(sijalicaCommandsBMPNPath)
	console.log(res)
})();
void (async () => {
	const zbc = new ZB.ZBClient()

	const res = await zbc.deployWorkflow(tvCommandsBMPNPath)
	console.log(res)
})();
void (async () => {
	const zbc = new ZB.ZBClient()

	const res = await zbc.deployWorkflow(noviDanBMPNPath)
	console.log(res)
})();