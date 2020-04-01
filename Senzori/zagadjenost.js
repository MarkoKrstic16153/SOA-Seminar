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

  let trenutnaZagadjenost = Math.random()*300;//pocetna zagadjenost je izmedju 0 i 300 cestica;
  let raste = Math.random()>0.5 ? true:false;
  let ukljucen = false;// da li je korisnik upalio preciscavac
  let aktivan = false;//da li cisti ili ne;
  let dozvoljenaZagadjenost = 75;
  let timerRada = 0;

  const timer = rxjs.interval(1000);
  timer.subscribe(()=>{
    console.log(timerRada);
    promeniZagadjenost();
    if(aktivan)
    timerRada+=3;
    posaljiPodatke();
});

  function promeniZagadjenost(){
      trenutnaZagadjenost += 0.02*trenutnaZagadjenost*raste;
      raste = Math.random()<0.1 ? -1*raste:raste;
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
    if(dozvoljenaZagadjenost < trenutnaZagadjenost*1.02)
        aktivan = true;
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
     .post('http://[::1]:3000/dans/zagadjenost', poruka)
     .then(res => {
     })
     .catch(error => {
       console.error(error)
     })
 }


