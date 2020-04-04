import { Component, OnInit } from '@angular/core';
import { SijalicaService } from 'src/services/SIjalicaServis';

@Component({
  selector: 'app-sijalice',
  templateUrl: './sijalice.component.html',
  styleUrls: ['./sijalice.component.css']
})
export class SijaliceComponent implements OnInit {

  sijalice:boolean[] = [false,false,false,false,false,false];
  brojUpaljenih:number = 0;
  constructor(private sijalicaService : SijalicaService) { }

  ngOnInit() {
  }

  upaliSijalicu(index:number){
    this.sijalice[index] = true;
    this.brojUpaljenih++;
    this.sijalicaService.ukljuciSijalicu();
  }

  ugasiSijalicu(index:number){
    this.sijalice[index] = false;
    this.brojUpaljenih--;
    this.sijalicaService.ugasiSijalicu();
  }

}
