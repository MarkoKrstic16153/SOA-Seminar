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
    let onOneCommand : any = {
      vrstaKomande : 3,
      vrednostKomande : index,
    };
    this.sijalice[index] = true;
    this.brojUpaljenih++;
    this.sijalicaService.issueCommand(onOneCommand);
  }

  ugasiSijalicu(index:number){
    let offOneCommand : any = {
      vrstaKomande : 0,
      vrednostKomande : index,
    };
    this.sijalice[index] = false;
    this.brojUpaljenih--;
    this.sijalicaService.issueCommand(offOneCommand);
  }

  ugasiSve(){
    let offAllCommand : any = {
      vrstaKomande : 1,
      vrednostKomande : 0,
    };
    this.sijalice = [false,false,false,false,false,false];
    this.brojUpaljenih = 0;
    this.sijalicaService.issueCommand(offAllCommand);
  }

  upaliSve(){
    let onAllCommand : any = {
      vrstaKomande : 2,
      vrednostKomande : 0,
    };
    this.sijalice = [true,true,true,true,true,true];
    this.brojUpaljenih = 6;
    this.sijalicaService.issueCommand(onAllCommand);
  }

}
