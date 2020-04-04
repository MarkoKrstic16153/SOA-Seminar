import { Component, OnInit } from '@angular/core';
import { KlimaService } from 'src/services/KlimaServis';
import { BoilerService } from 'src/services/BoilerServis';
import { OsvezavacService } from 'src/services/OsvezavacServis';
import { PreciscavacService } from 'src/services/PreciscavacServis';
import { TvService } from 'src/services/TvServis';
import { SijalicaService } from 'src/services/SIjalicaServis';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private ks : KlimaService,private bs: BoilerService,private vs:OsvezavacService,private ps:PreciscavacService,private tvs:TvService,private sis:SijalicaService) { }

  ngOnInit() {
  }

}
