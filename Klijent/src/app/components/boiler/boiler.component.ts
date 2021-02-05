import { Component, OnInit } from '@angular/core';
import { BoilerService } from 'src/services/BoilerServis';
import { FormControl, Validators } from '@angular/forms';
import { interval } from 'rxjs';

@Component({
  selector: 'app-boiler',
  templateUrl: './boiler.component.html',
  styleUrls: ['./boiler.component.css']
})
export class BoilerComponent implements OnInit {

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
  constructor(private boilerService : BoilerService) { }

  ngOnInit() {
    interval(3000).subscribe(()=>{ 
      let i;    
      let niz : any[] = [];
      for(i=0;i<this.boilerService.temp.length;i++){
        niz.push(this.boilerService.temp[i]);
      }
      this.chartDatasets = [
        { data: niz, label: 'Temperatura Vode' },
      ];
      this.chartLabels = [];
      for(let i=0;i<niz.length;i++)
          this.chartLabels.push(i+1);
    });
    let i; 
    let niz : any[] = [];
    for(i=0;i<this.boilerService.temp.length;i++){
      niz.push(this.boilerService.temp[i]);
    }
      this.chartDatasets = [
        { data: niz, label: 'Temperatura Vode' },
      ];
      this.chartLabels = [];
      for(let i=0;i<niz.length;i++)
          this.chartLabels.push(i+1);
  }

  stanje(){
    if(this.boilerService.boilerTemp.stanjeUredjaja == true){
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
    this.boilerService.issueCommand(onCommand);
  }

  ugasi(){
    let offCommand : any = {
      vrstaKomande : 0,
      vrednostKomande : 0
    };
    this.boilerService.issueCommand(offCommand);
  }

}
