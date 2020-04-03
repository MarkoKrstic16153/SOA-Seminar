var rxjs = require("rxjs");
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const axios = require('axios');

var app = express();

const port = 3003;
const senzor = "Zagadjenost";

app.use(cors());

app.listen(port, () => {
    console.log("Senzor za " + senzor +" startovan na portu: " + port);
  });

  app.get("/", (req, res) => {
    res.send("Hello " + senzor);
  });

  app.get("/upali", (req, res) => {
    upaliPreciscavac();
    res.send("Upaljen " + senzor);
  });

  app.get("/ugasi", (req, res) => {
    ugasiPreciscavac();
    res.send("Ugasen " + senzor);
  });

  let trenutnaZagadjenost = 50 + Math.random()*300;//pocetna zagadjenost je izmedju 0 i 300 cestica;
  let raste = Math.random()>0.5 ? 1:-1;
  let ukljucen = false;// da li je korisnik upalio preciscavac
  let aktivan = false;//da li cisti ili ne;
  let dozvoljenaZagadjenost = 75;
  let timerRada = 0;
  let minZag = 100;
  let maxZag = 150;
  const timer = rxjs.interval(1000);
  timer.subscribe(()=>{
    console.log(timerRada);
    promeniZagadjenost();
    daLiTrebaDaCisti();
    if(aktivan)
    timerRada+=3;
    posaljiPodatke();
});

  function promeniZagadjenost(){
    if(aktivan == false){
      trenutnaZagadjenost += 0.02*trenutnaZagadjenost*raste;
      raste = Math.random()<0.1 ? -1*raste:raste;
    }
    else{
      trenutnaZagadjenost -= 0.02*trenutnaZagadjenost;
    }
}

function upaliPreciscavac(){
    ukljucen = true;
    daLiTrebaDaCisti();
}

function ugasiPreciscavac(){
    ukljucen = false;
    aktivan = false;
}

function daLiTrebaDaCisti(){
  if(ukljucen){
    if(dozvoljenaZagadjenost < trenutnaZagadjenost*1.05)
        aktivan = true;
    else 
        aktivan = false;
  }
}

function posaljiPodatke(){
  if(trenutnaZagadjenost > maxZag)
  maxZag = trenutnaZagadjenost;
  if(trenutnaZagadjenost<minZag)
  minZag = trenutnaZagadjenost;
    let poruka = {
       Zag: trenutnaZagadjenost,
       VremeRada: timerRada,
        MinZag:minZag,
        MaxZag:maxZag,
    };
    console.log(poruka);
     axios
     .put('http://[::1]:3000/preciscavacs/1', poruka)
     .then(res => {
     })
     .catch(error => {
       console.error(error)
     })
 }


