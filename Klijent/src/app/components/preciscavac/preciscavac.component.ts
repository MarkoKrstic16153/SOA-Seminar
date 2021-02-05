import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PreciscavacService } from 'src/services/PreciscavacServis';
import { interval } from 'rxjs';

@Component({
  selector: 'app-preciscavac',
  templateUrl: './preciscavac.component.html',
  styleUrls: ['./preciscavac.component.css']
})
export class PreciscavacComponent implements OnInit {

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
  constructor(private preciscavacService : PreciscavacService) { }

  ngOnInit() {
    let i;    
      let niz : any[] = [];
    for(i=0;i<this.preciscavacService.temp.length;i++){
      niz.push(this.preciscavacService.temp[i]);
    }
    this.chartDatasets = [
      { data:niz, label: 'Zagadjenost Vazduha' },
    ];
    this.chartLabels = [];
    for(let i=0;i<niz.length;i++)
        this.chartLabels.push(i+1);
    interval(3000).subscribe(()=>{
      let i;    
      let niz : any[] = [];
    for(i=0;i<this.preciscavacService.temp.length;i++){
      niz.push(this.preciscavacService.temp[i]);
    }
      this.chartDatasets = [
        { data:niz, label: 'Zagadjenost Vazduha' },
      ];
      this.chartLabels = [];
      for(let i=0;i<niz.length;i++)
          this.chartLabels.push(i+1);
    });
  }

  ukljuci(){
    let onCommand : any = {
      vrstaKomande : 1,
      vrednostKomande : 0
    };
    this.preciscavacService.issueCommand(onCommand);
  }

  ugasi(){
    let offCommand : any = {
      vrstaKomande : 0,
      vrednostKomande : 0,
    };
    this.preciscavacService.issueCommand(offCommand);
  }

  stanje(){
    if(this.preciscavacService.preciscavacData.stanjeUredjaja == true){
      return "Ukljucen";
    }
    else {
      return "Iskljucen";
    }
  }

}
