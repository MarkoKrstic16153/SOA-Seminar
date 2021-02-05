import { Component } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { interval } from 'rxjs';
import { BoilerService } from 'src/services/BoilerServis';
import { KlimaService } from 'src/services/KlimaServis';
import { ObavestenjaService } from 'src/services/ObavestenjaService';
import { OsvezavacService } from 'src/services/OsvezavacServis';
import { PreciscavacService } from 'src/services/PreciscavacServis';
import { SijalicaService } from 'src/services/SIjalicaServis';
import { StatisticsService } from 'src/services/StatisticsService';
import { TvService } from 'src/services/TvServis';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My eHouse';
  podaciTopic : string = 'podaci-centrala-klijent';
  obavestenjaTopic : string = 'notifikacije-centrala-klijent';

  constructor(
    private socket: Socket,
    private boilerService: BoilerService,
    private klimaService: KlimaService,
    private vlaznostService: OsvezavacService,
    private zagadjenostService: PreciscavacService,
    private tvService: TvService,
    private sijalicaService: SijalicaService,
    private statisticsService: StatisticsService,
    private obavestenjeServis: ObavestenjaService
  ) {}

  ngOnInit(): void {
    this.konektujSeNaNotifikacijeIPodatke();
  }

  konektujSeNaNotifikacijeIPodatke() {

    this.socket
      .fromEvent(this.podaciTopic)
      .subscribe((data: any) => {
        this.dispatchData(data);
      });

    this.socket
    .fromEvent(this.obavestenjaTopic)
    .subscribe((notification: any) => {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      var hh = today.getHours();
      var min = today.getMinutes();

      let datumVreme = dd + '/' + mm + '/' + yyyy + " " + hh + ":" + min;
      let data = {
        body:notification,
        vreme:datumVreme
      };
      this.obavestenjeServis.dodajPrikazNotifikacija(data);
      this.obavestenjeServis.dodajObavestenje(data);
    });
    /*interval(10000).subscribe(()=>{
      console.log('aaa');
      this.statisticsService.endDay();
  })*/ 
  }

  dispatchData(data:any){
    switch (data.tipUredjaja){
      case "Boiler" : {
        this.boilerService.dodajNovoMerenje(data.podatakVrednost);
        this.boilerService.boilerTemp = data;
        return;
      }
      case "Klima" : {
        this.klimaService.dodajNovoMerenje(data.podatakVrednost);
        this.klimaService.klimaTemp = data;
        return;
      }
      case "Preciscavac" : {
        this.zagadjenostService.dodajNovoMerenje(data.podatakVrednost);
        this.zagadjenostService.preciscavacData = data;
        return;
      }
      case "Osvezavac" : {
        this.vlaznostService.dodajNovoMerenje(data.podatakVrednost);
        this.vlaznostService.osvezavacData = data;
        return;
      }
      case "Sijalice" : {
        this.sijalicaService.sijalicaData = data;
        return;
      }
      case "TV" : {
        this.tvService.tvData = data;
        return;
      }
    }
  }

  /*skloniNotifikaciju(index: number) {
    this.nizNotifikacija.splice(this.nizNotifikacija.length - index - 1, 1);
  }

  ocisti() {
    this.nizNotifikacija = [];
  }*/
}
