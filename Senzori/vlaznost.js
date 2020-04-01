var rxjs = require("rxjs");
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const axios = require('axios');

var app = express();

const port = 3002;
const senzor = "Vlaznost";

app.use(cors());

app.listen(port, () => {
    console.log("Senzor za " + senzor +" startovan na portu: " + port);
  });

  app.get("/", (req, res) => {
    res.send("Hello " + senzor);
  });

  app.get("/upali/:vla", (req, res) => {
    ciljnaVlaznost = req.params.vla;
    console.log(ciljnaVlaznost);
    upaliVlaznost();
    res.send("Upaljen " + senzor);
  });

  app.get("/ugasi", (req, res) => {
    ugasiVlaznost();
    res.send("Ugasen " + senzor);
  });

let trenutnaVlaznost = 20 + Math.random()*40;//pocetna temperatura je izmedju 20 i 60 procenata;
let raste = Math.random()>0.5 ? true:false;// pocetno biramo rand trend vlaznosti;
let ukljucen = false;//da li radi ili ne;
let aktivan = false;//da li regulise vlagu ili ne;
let ciljnaVlaznost = -999;
let timerRada = 0;

const timer = rxjs.interval(1000);
timer.subscribe(()=>{
    console.log(timerRada);
    promeniVlaznost();
    if(aktivan)
    timerRada+=3;
    posaljiPodatke();
});

function promeniVlaznost(){
    if(raste)
        trenutnaVlaznost++;
    else
        trenutnaVlaznost--;
    raste = Math.random()<0.1 ? !raste:raste;
}

function odrediTrend(novaCiljnaVlaznost){
    if(novaCiljnaVlaznost > trenutnaVlaznost)
        raste = true;
    else
        raste = false;
}

function upaliVlaznost(){
    ukljucen = true;
    daLiTrebaDaAktivna();
}

function ugasiVlaznost(){
    ukljucen = true;
    aktivan = false;
}

function daLiTrebaDaAktivna(){
    if((ciljnaVlaznost > trenutnaVlaznost + trenutnaVlaznost*0.05) || (ciljnaVlaznost < 0.95*trenutnaVlaznost)){
        aktivan = true;
        odrediTrend();
    }
    else 
        aktivan = false;
}

function posaljiPodatke(){
    let poruka = {
       vrednost: trenutnaVlaznost,
       vremeRada: timerRada
    };
    console.log(poruka);
     axios
     .post('http://[::1]:3000/dans/vlaznost', poruka)
     .then(res => {
     })
     .catch(error => {
       console.error(error)
     })
 }