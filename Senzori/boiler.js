var rxjs = require("rxjs");
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const axios = require('axios');

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

  app.get("/upali/:temp", (req, res) => {
    ciljnaTemperatura = req.params.temp;
    console.log(ciljnaTemperatura);
    upaliBoiler();
    res.send("Upaljen " + senzor);
  });

  app.get("/ugasi", (req, res) => {
    ugasiBoiler();
    res.send("Ugasen " + senzor);
  });

  let trenutnaTemperatura = 20 + Math.random()*20;//pocetna temperatura vode je izmedju 20 i 40 stepeni;
let ukljucen = false;// da li je korisnik upalio boiler
let aktivan = false;//da li greje ili ne;
let dostigaoMax = false;
let ciljnaTemperatura = -999;
let timerRada = 0;

const timer = rxjs.interval(3000);
timer.subscribe(()=>{
    console.log(timerRada);
    promeniTemperaturu();
    if(aktivan)
    timerRada+=3;
    posaljiPodatke();
});

function promeniTemperaturu(){
    daLiTrebaDaGreje();
    if(aktivan)
        trenutnaTemperatura++;
    else if (trenutnaTemperatura > 8)
        trenutnaTemperatura--;
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

function posaljiPodatke(){
   let poruka = {
    Voda: trenutnaTemperatura,
      VremeRada: timerRada,
      Potrosnja: timerRada*56 
   };
   console.log(poruka);
    axios
    .put('http://[::1]:3000/boilers/1', poruka)
    .then(res => {
    })
    .catch(error => {
      console.error(error)
    })
}