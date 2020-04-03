var rxjs = require("rxjs");
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const axios = require('axios');

var app = express();

const port = 3016;
const senzor = "Sijalice";

app.use(cors());

app.listen(port, () => {
    console.log("Senzor za " + senzor +" startovan na portu: " + port);
  });

  app.get("/", (req, res) => {
    res.send("Hello " + senzor);
  });

  app.get("/upali", (req, res) => {
    upaliSijalicu();
    res.send("Upaljen " + senzor);
  });

  app.get("/ugasi", (req, res) => {
    ugasiSijalicu();
    res.send("Ugasen " + senzor);
  });

  let timerRada = 0;
  let brojSijalica = 0;

    const timer = rxjs.interval(3000);
    timer.subscribe(()=>{
    console.log(timerRada);
    if(brojSijalica>0){
      timerRada+=3;
      posaljiPodatke();
    }
});

function upaliSijalicu(){
    if(brojSijalica<6)
        brojSijalica++;
}

function ugasiSijalicu(){
    if(brojSijalica>0)
        brojSijalica--;
}

function posaljiPodatke(){
    let poruka = {
       Potrosnja: brojSijalica * timerRada * 10,
       VremeRada: timerRada
    };
    console.log(poruka);
     axios
     .put('http://[::1]:3000/sijalicas/1', poruka)
     .then(res => {
     })
     .catch(error => {
       console.error(error)
     })
    }