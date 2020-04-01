var rxjs = require("rxjs");
var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");

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

  let trenutnaZagadjenost = Math.random()*300;//pocetna zagadjenost je izmedju 0 i 300 cestica;
  let raste = Math.random()>0.5 ? true:false;
  let ukljucen = false;// da li je korisnik upalio preciscavac
  let aktivan = false;//da li cisti ili ne;
  let dozvoljenaZagadjenost = 75;
  let timerRada = 0;

  const timer = rxjs.interval(1000);
  timer.subscribe(()=>{timerRada++;console.log(timerRada)});

  function promeniZagadjenost(){
      trenutnaZagadjenost += 0.02*trenutnaZagadjenost*raste;
      raste = Math.random()<0.1 ? -1*raste:raste;
}

function upaliPreciscavac(){
    ukljucen = true;
    daLiTrebaDaCisti();
}

function daLiTrebaDaCisti(){
    if(dozvoljenaZagadjenost < trenutnaZagadjenost*1.02)
        aktivan = true;
    else 
        aktivan = false;
}




