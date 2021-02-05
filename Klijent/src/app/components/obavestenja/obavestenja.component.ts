import { Component, OnInit } from '@angular/core';
import { ObavestenjaService } from 'src/services/ObavestenjaService';

@Component({
  selector: 'app-obavestenja',
  templateUrl: './obavestenja.component.html',
  styleUrls: ['./obavestenja.component.css']
})
export class ObavestenjaComponent implements OnInit {
  filterType: number = 0;

  constructor(private obavestenjeServis : ObavestenjaService) { }

  ngOnInit(): void {
    this.returnValid(this.obavestenjeServis.nizObavestenja);
  }

  returnValid(niz: any[]) {
    if (this.filterType == 0) {
      return niz.reverse();
    }
    else if (this.filterType == 1) {
      let pomNiz: any[] = [];
      niz.forEach((noti: any) => {
        if (noti.body.telo.tipUredjaja == 'Boiler') pomNiz.push(noti);
      });
      return pomNiz;
    } else if (this.filterType == 2) {
      let pomNiz: any[] = [];
      niz.forEach((noti: any) => {
        if (noti.body.telo.tipUredjaja == 'Klima') pomNiz.push(noti);
      });
      return pomNiz;
    } else if (this.filterType == 3) {
      let pomNiz: any[] = [];
      niz.forEach((noti: any) => {
        if (noti.body.telo.tipUredjaja == 'Preciscavac') pomNiz.push(noti);
      });
      return pomNiz;
    } else if (this.filterType == 4) {
      let pomNiz: any[] = [];
      niz.forEach((noti: any) => {
        if (noti.body.telo.tipUredjaja == 'Osvezavac') pomNiz.push(noti);
      });
      return pomNiz;
    }
  }

  setFilter(filterType: number) {
    this.filterType = filterType;
    this.returnValid(this.obavestenjeServis.nizObavestenja);
  }

}
