var rxjs = require("rxjs");
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");

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

let trenutnaVlaznost = 20 + Math.random()*40;//pocetna temperatura je izmedju 20 i 60 procenata;
let raste = Math.random()>0.5 ? true:false;// pocetno biramo rand trend vlaznosti;
let ukljucen = false;//da li radi ili ne;
let aktivan = false;//da li regulise vlagu ili ne;
let ciljnaVlaznost = -999;
let timerRada = 0;

const timer = rxjs.interval(1000);
timer.subscribe(()=>{timerRada++;console.log(timerRada)});

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

function daLiTrebaDaAktivna(){
    if((ciljnaVlaznost > trenutnaVlaznost + trenutnaVlaznost*0.05) || (ciljnaVlaznost < 0.95*trenutnaVlaznost)){
        aktivan = true;
        odrediTrend();
    }
    else 
        aktivan = false;
}