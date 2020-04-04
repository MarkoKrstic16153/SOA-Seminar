import { Component, OnInit } from '@angular/core';
import { KlimaService } from 'src/services/KlimaServis';
import { BoilerService } from 'src/services/BoilerServis';
import { TvService } from 'src/services/TvServis';
import { SijalicaService } from 'src/services/SIjalicaServis';
import { interval } from 'rxjs';

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
      backgroundColor: ['rgba(255,0,0,0.4)', 'rgba(0,255,0,0.4)', 'rgba(0,0,255,0.4)','rgba(255,255,0,0.4)'],
      borderColor: 'rgba(25, 25, 25, .5)',
      borderWidth: 1,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };


  constructor(private ks : KlimaService,private bs: BoilerService,private tvs:TvService,private sis:SijalicaService) { }

  ngOnInit() {
    interval(3000).subscribe(()=>{
      let niz : any[] = [this.ks.klimaTemp.Potrosnja, this.bs.boilerTemp.Potrosnja, this.sis.sijalicaData.Potrosnja, this.tvs.tvData.Potrosnja];
      this.chartDatasets = [
        { data:niz, label: 'Potrosnja u Kuci' },
      ];
      this.chartLabels = ["Klima","Boiler","Sijalice","Tv"];
      this.sumiraj();
    });
  }

  sumiraj(){
    this.suma = this.ks.klimaTemp.Potrosnja + this.bs.boilerTemp.Potrosnja + this.sis.sijalicaData.Potrosnja + this.tvs.tvData.Potrosnja;
  }

}
