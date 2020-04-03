var rxjs = require("rxjs");
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const axios = require('axios');

var app = express();

const port = 3011;
const senzor = "Tv";

app.use(cors());

app.listen(port, () => {
    console.log("Senzor za " + senzor +" startovan na portu: " + port);
  });

  app.get("/", (req, res) => {
    res.send("Hello " + senzor);
  });

  app.get("/upali", (req, res) => {
    upaliTv();
    res.send("Upaljen " + senzor);
  });

  app.get("/ugasi", (req, res) => {
    ugasiTv();
    res.send("Ugasen " + senzor);
  });

  let ukljucen = false;
  let timerRada = 0;


    const timer = rxjs.interval(3000);
    timer.subscribe(()=>{
    console.log(timerRada);
    if(ukljucen){
      timerRada+=3;
      posaljiPodatke();
    }
});

function upaliTv(){
    ukljucen = true;
}

function ugasiTv(){
    ukljucen = false;
}

function posaljiPodatke(){
    let poruka = {
    
       Potrosnja: timerRada * 3,
       VremeRada: timerRada
    };
    console.log(poruka);
     axios
     .put('http://[::1]:3000/tvs/1', poruka)
     .then(res => {
     })
     .catch(error => {
       console.error(error)
     })
    }