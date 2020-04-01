var rxjs = require("rxjs");
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");

var app = express();

const port = 3004;
const senzor = "Boiler";

app.use(cors());

app.listen(port, () => {
    console.log("Senzor za " + senzor +" startovan na portu: " + port);
  });

  app.get("/", (req, res) => {
    res.send("Hello " + senzor);
  });

  let trenutnaTemperatura = 20 + Math.random()*20;//pocetna temperatura vode je izmedju 20 i 40 stepeni;
let ukljucen = false;// da li je korisnik upalio boiler
let aktivan = false;//da li greje ili ne;
let ciljnaTemperatura = -999;
let timerRada = 0;

const timer = rxjs.interval(1000);
timer.subscribe(()=>{timerRada++;console.log(timerRada)});

function promeniTemperaturu(){
    if(aktivan)
        trenutnaTemperatura++;
    else
        trenutnaTemperatura--;
}

function upaliBoiler(){
    ukljucen = true;
    daLiTrebaDaGreje();
}

function daLiTrebaDaGreje(){
    if(ciljnaTemperatura > trenutnaTemperatura + trenutnaTemperatura*0.05)
        aktivan = true;
    else 
        aktivan = false;
}