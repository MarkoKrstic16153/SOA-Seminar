import { Component, OnInit } from '@angular/core';
import { KlimaService } from 'src/services/KlimaServis';
import { FormControl, Validators } from '@angular/forms';
import { interval } from 'rxjs';

@Component({
  selector: 'app-klima',
  templateUrl: './klima.component.html',
  styleUrls: ['./klima.component.css']
})
export class KlimaComponent implements OnInit {


  chartDatasets: Array<any> = [];
  chartLabels: Array<any> = [];
  chartType: string = 'line';

  
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };

  tempControl: FormControl = new FormControl("", Validators.required);
  constructor(private klimaService : KlimaService) { }

  ngOnInit() {
    interval(3000).subscribe(()=>{
      let i;    
      let niz : any[] = [];
      for(i=0;i<this.klimaService.temp.length;i++){
        niz.push(this.klimaService.temp[i]);
      }
      this.chartDatasets = [
        { data:niz, label: 'Temperatura Sobe' },
      ];
      this.chartLabels = [];
      for(let i=0;i<niz.length;i++)
          this.chartLabels.push(i+1);
    });
    let i;    
      let niz : any[] = [];
    for(i=0;i<this.klimaService.temp.length;i++){
      niz.push(this.klimaService.temp[i]);
    }
    this.chartDatasets = [
      { data:niz, label: 'Temperatura Sobe' },
    ];
    this.chartLabels = [];
    for(let i=0;i<niz.length;i++)
        this.chartLabels.push(i+1);

  }

  stanje(){
    if(this.klimaService.klimaTemp.stanjeUredjaja == true){
      return "Ukljucen";
    }
    else {
      return "Iskljucen";
    }
  }

  ukljuci(){    
    let onCommand : any = {
      vrstaKomande : 1,
      vrednostKomande : this.tempControl.value,
    };
    this.klimaService.issueCommand(onCommand);
  }

  ugasi(){
    let offCommand : any = {
      vrstaKomande : 0,
      vrednostKomande : 0
    };
    this.klimaService.issueCommand(offCommand);
  }

}
