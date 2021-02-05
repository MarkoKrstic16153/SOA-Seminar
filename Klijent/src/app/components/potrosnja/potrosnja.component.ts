import { Component, OnInit } from '@angular/core';
import { KlimaService } from 'src/services/KlimaServis';
import { BoilerService } from 'src/services/BoilerServis';
import { TvService } from 'src/services/TvServis';
import { SijalicaService } from 'src/services/SIjalicaServis';
import { interval } from 'rxjs';
import { PreciscavacService } from 'src/services/PreciscavacServis';
import { OsvezavacService } from 'src/services/OsvezavacServis';

@Component({
  selector: 'app-potrosnja',
  templateUrl: './potrosnja.component.html',
  styleUrls: ['./potrosnja.component.css']
})
export class PotrosnjaComponent implements OnInit {

  suma:number=0;
  chartDatasets: Array<any> = [];
  chartLabels: Array<any> = [];
  chartType: string = 'pie';
  public chartColors: Array<any> = [
    {
      backgroundColor: ['rgba(255,0,0,0.4)', 'rgba(0,255,0,0.4)', 'rgba(0,0,255,0.4)', 'rgba(255,255,0,0.4)', 'rgba(255,0,255,0.4)', 'rgba(0,255,255,0.4)'],
      borderColor: 'rgba(25, 25, 25, .5)',
      borderWidth: 1,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };


  constructor(private ks : KlimaService, private bs : BoilerService, private tvs : TvService, private sis : SijalicaService, private ps : PreciscavacService, private os : OsvezavacService) { }

  ngOnInit() {
    interval(3000).subscribe(()=>{
      let niz : any[] = [this.ks.klimaTemp.potrosnjaUredjaja, this.bs.boilerTemp.potrosnjaUredjaja, this.sis.sijalicaData.potrosnjaUredjaja, this.tvs.tvData.potrosnjaUredjaja, this.ps.preciscavacData.potrosnjaUredjaja, this.os.osvezavacData.potrosnjaUredjaja];
      this.chartDatasets = [
        { data:niz, label: 'Potrosnja Uredjaja u Kuci' },
      ];
      this.chartLabels = ["Klima", "Boiler", "Sijalice", "Tv", "Preciscavac", "Osvezavac"];
      this.sumiraj();
    });
    let niz : any[] = [this.ks.klimaTemp.potrosnjaUredjaja, this.bs.boilerTemp.potrosnjaUredjaja, this.sis.sijalicaData.potrosnjaUredjaja, this.tvs.tvData.potrosnjaUredjaja, this.ps.preciscavacData.potrosnjaUredjaja, this.os.osvezavacData.potrosnjaUredjaja];
      this.chartDatasets = [
        { data:niz, label: 'Potrosnja Uredjaja u Kuci' },
      ];
      this.chartLabels = ["Klima", "Boiler", "Sijalice", "Tv", "Preciscavac", "Osvezavac"];
      this.sumiraj();
    
  }

  sumiraj(){
    this.suma = this.ks.klimaTemp.potrosnjaUredjaja + this.bs.boilerTemp.potrosnjaUredjaja + this.sis.sijalicaData.potrosnjaUredjaja + this.tvs.tvData.potrosnjaUredjaja + this.ps.preciscavacData.potrosnjaUredjaja + this.os.osvezavacData.potrosnjaUredjaja;
  }

}
