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
let minTemp = 25;
let maxTemp = 25;

const timer = rxjs.interval(2000);
timer.subscribe(()=>{
    console.log(timerRada);
    promeniTemperaturu();
    daLiTrebaDaAktivna();
    if(aktivan)
    timerRada+=3;
    posaljiPodatke();
});

function promeniTemperaturu(){
    if(raste)
        trenutnaTemperatura++;
    else
        trenutnaTemperatura--;
    if(aktivan == false)
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
    //odrediTrend(ciljnaTemperatura);
    daLiTrebaDaAktivna();
}

function ugasiKlimu(){
    ukljucen = false;
    aktivan = false;
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

function posaljiPodatke(){
    if(trenutnaTemperatura > maxTemp)
    maxTemp = trenutnaTemperatura;
    if(trenutnaTemperatura<minTemp)
    minTemp = trenutnaTemperatura;
      let poruka = {
         Temp: trenutnaTemperatura,
         VremeRada: timerRada,
          MinTemp:minTemp,
          MaxValue:maxTemp,
          Potrosnja:timerRada*51
      };
    console.log("aktivan " + aktivan);
    console.log(poruka);
     axios
     .put('http://[::1]:3000/klimas/1', poruka)
     .then(res => {
     })
     .catch(error => {
       console.error(error)
     })
 }
