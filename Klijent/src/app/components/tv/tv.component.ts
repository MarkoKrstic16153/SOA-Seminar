import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { TvService } from 'src/services/TvServis';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {

  noviKanalControl: FormControl = new FormControl("", Validators.required);

  constructor(private tvService : TvService) { }

  ngOnInit() {
  }

  ukljuci(){
    let onCommand : any = {
      vrstaKomande : 3,
      vrednostKomande : 0,
    };
    this.tvService.issueCommand(onCommand);
  }

  ugasi(){
    let offCommand : any = {
      vrstaKomande : 0,
      vrednostKomande : 0,
    };
    this.tvService.issueCommand(offCommand);
  }

  dodajKanal(){
    if(this.tvService.tvData.stanjeUredjaja == true){
      let addChannelCommand : any = {
        vrstaKomande : 2,
        vrednostKomande : this.noviKanalControl.value,
      };
      this.tvService.issueCommand(addChannelCommand);
    }
  }

  promeniKanal(index:number){
    if(this.tvService.tvData.stanjeUredjaja == true){
      let changeChannelCommand : any = {
        vrstaKomande : 1,
        vrednostKomande : index + 1,
      };
      this.tvService.issueCommand(changeChannelCommand);
    }
  }

  stanje(){
    if(this.tvService.tvData.stanjeUredjaja == true){
      return "Ukljucen";
    }
    else {
      return "Iskljucen";
    }
  }

}
