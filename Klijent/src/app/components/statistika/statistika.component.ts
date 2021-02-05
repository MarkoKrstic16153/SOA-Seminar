import { Component, OnInit } from '@angular/core';
import { interval, range } from 'rxjs';
import { StatisticsService } from 'src/services/StatisticsService';

@Component({
  selector: 'app-statistika',
  templateUrl: './statistika.component.html',
  styleUrls: ['./statistika.component.css']
})
export class StatistikaComponent implements OnInit {

  //BAR CHART
  barChartDatasets: Array<any> = [];
  barChartLabels: Array<any> = [];
  barChartType: string = 'bar';
  public barChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    }
  ];
  public barChartOptions: any = {
    responsive: true
  };
  //PIE CHART
  pieChartDatasets: Array<any> = [];
  pieChartLabels: Array<any> = [];
  pieChartType: string = 'pie';
  public pieChartColors: Array<any> = [
    {
      backgroundColor: ['rgba(255,0,0,0.4)', 'rgba(0,255,0,0.4)', 'rgba(0,0,255,0.4)', 'rgba(255,255,0,0.4)', 'rgba(255,0,255,0.4)', 'rgba(0,255,255,0.4)'],
      borderColor: 'rgba(25, 25, 25, .5)',
      borderWidth: 1,
    }
  ];
  public pieChartOptions: any = {
    responsive: true
  };

  selectedIndex:any;
  selektovanDan:boolean = false;

  constructor(private statistikaServis : StatisticsService) { }

  ngOnInit() {
    this.statistikaServis.getAllDays().subscribe((data:any[])=>{
      this.statistikaServis.totalDays = [];
      console.log(data);
      this.statistikaServis.allDays = data;
      this.statistikaServis.allDays.forEach((element)=>{this.statistikaServis.totalDays.push(element.total)})

      let i; 
      let niz : any[] = [];
      for(i=0;i<this.statistikaServis.totalDays.length;i++){
        niz.push(this.statistikaServis.totalDays[i]);
      }
        this.barChartDatasets = [
          { data: niz, label: 'Potrosnja za Prethodne Dane' },
        ];
        this.barChartLabels = [];
        for(let i=0;i<niz.length;i++)
            this.barChartLabels.push(i+1);
  });

  }

  zavrsiDan(){
    this.statistikaServis.endDay();
    let obs = interval(1000);
    let sub = obs.subscribe(()=>{ 
      this.statistikaServis.getAllDays().subscribe((data:any[])=>{
        this.statistikaServis.totalDays = [];
        console.log(data);
        this.statistikaServis.allDays = data;
        this.statistikaServis.allDays.forEach((element)=>{this.statistikaServis.totalDays.push(element.total)})
  
        let i; 
        let niz : any[] = [];
        for(i=0;i<this.statistikaServis.totalDays.length;i++){
          niz.push(this.statistikaServis.totalDays[i]);
        }
          this.barChartDatasets = [
            { data: niz, label: 'Potrosnja za Prethodne Dane' },
          ];
          this.barChartLabels = [];
          for(let i=0;i<niz.length;i++)
              this.barChartLabels.push(i+1);
              sub.unsubscribe();
    })});
  }

  onChangeSelect(index:number){
    this.selectedIndex = index;
    this.selektovanDan = true;
    this.napuniDetaljeZaDan(index);
  }

  prosecnaPotrosnja(){
    let ukupno = 0;
    this.statistikaServis.totalDays.forEach((element)=>{
      ukupno += element;
    })
    return ukupno / this.statistikaServis.totalDays.length;
  }

  napuniDetaljeZaDan(index:number){
    let data = this.statistikaServis.allDays[index];
    let niz : any[] = [data.boiler, data.klima, data.sijalica, data.tv, data.pollution, data.humidity];
    this.pieChartDatasets = [
      { data:niz, label: 'Potrosnja Uredjaja u Kuci' },
    ];
    this.pieChartLabels = ["Klima", "Boiler", "Sijalice", "Tv", "Preciscavac", "Osvezavac"];
  }

}
