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
let minVlaz = 50;
let maxVlaz = 50;

const timer = rxjs.interval(2000);
timer.subscribe(()=>{
    console.log(timerRada);
    promeniVlaznost();
    daLiTrebaDaAktivna();
    if(aktivan)
    timerRada+=3;
    posaljiPodatke();
});

function promeniVlaznost(){
    if(raste)
        trenutnaVlaznost++;
    else
        trenutnaVlaznost--;
    if(aktivan == false)
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
    ukljucen = false;
    aktivan = false;
}

function daLiTrebaDaAktivna(){
    if(ukljucen == true){
        if(aktivan == false){
            console.log("Ciljna" + ciljnaVlaznost)
         if (trenutnaVlaznost > (ciljnaVlaznost - -1*3)){
            console.log("Aktiviram Susenje!")
            aktivan = true;
            raste = false;
        }
        else if (trenutnaVlaznost < (ciljnaVlaznost - 3)){
            console.log("Aktiviram Vlazenje!")
            aktivan = true;
            raste = true;
        }
    }
        else if((trenutnaVlaznost > (ciljnaVlaznost - 1)) && (trenutnaVlaznost  < (ciljnaVlaznost - -1*1)) && aktivan == true){
            console.log("DeAktiviram Osvezavac!");
            aktivan = false;
        }
    }
}

function posaljiPodatke(){
    if(trenutnaVlaznost > maxVlaz)
  maxVlaz = trenutnaVlaznost;
  if(trenutnaVlaznost<minVlaz)
  minVlaz = trenutnaVlaznost;
    let poruka = {
        Vlaz: trenutnaVlaznost,
        VremeRada: timerRada,
         MinVlaz:minVlaz,
         MaxVlaz:maxVlaz,
     };
    console.log(poruka);
     axios
     .put('http://[::1]:3000/osvezavacs/1', poruka)
     .then(res => {
     })
     .catch(error => {
       console.error(error)
     })
 }