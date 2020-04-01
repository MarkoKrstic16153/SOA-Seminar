var rxjs = require("rxjs");
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const axios = require('axios');
var app = express();

const port = 3001;
const senzor = "Temperaturu";

app.use(cors());

app.listen(port, () => {
    console.log("Senzor za " + senzor +" startovan na portu: " + port);
  });

  app.get("/", (req, res) => {
    res.send("Hello " + senzor);
  });

  app.get("/upali/:temp", (req, res) => {
    ciljnaTemperatura = req.params.temp;
    console.log(ciljnaTemperatura);
    upaliKlimu();
    res.send("Upaljen " + senzor);
  });

  app.get("/ugasi", (req, res) => {
    ugasiKlimu();
    res.send("Ugasen " + senzor);
  });

let trenutnaTemperatura = 10 + Math.random()*20;//pocetna temperatura je izmedju 10 i 30 stepeni;
let raste = Math.random()>0.5 ? true:false;// pocetno biramo rand trend temperature;
let ukljucen = false;//da li radi ili ne;
let aktivan = false;//da li greje ili ne;
let ciljnaTemperatura = -999;
let timerRada = 0;

const timer = rxjs.interval(1000);
timer.subscribe(()=>{
    console.log(timerRada);
    promeniTemperaturu();
    if(aktivan)
    timerRada+=3;
    posaljiPodatke();
});

function promeniTemperaturu(){
    if(raste)
        trenutnaTemperatura++;
    else
        trenutnaTemperatura--;
    raste = Math.random()<0.1 ? !raste:raste;
}

function odrediTrend(novaCiljnaTemperatura){
    if(novaCiljnaTemperatura > trenutnaTemperatura)
        raste = true;
    else
        raste = false;
}

function upaliKlimu(){
    ukljucen = true;
    daLiTrebaDaAktivna();
}

function ugasiKlimu(){
    ukljucen = false;
    aktivan = false;
}

function daLiTrebaDaAktivna(){
    if((ciljnaTemperatura > trenutnaTemperatura + trenutnaTemperatura*0.05) || (ciljnaTemperatura < 0.95*trenutnaTemperatura)){
        aktivan = true;
        odrediTrend();
    }
    else 
        aktivan = false;
}

function posaljiPodatke(){
    let poruka = {
       vrednost: trenutnaTemperatura,
       vremeRada: timerRada
    };
    console.log(poruka);
     axios
     .post('http://[::1]:3000/dans/klima', poruka)
     .then(res => {
     })
     .catch(error => {
       console.error(error)
     })
 }
