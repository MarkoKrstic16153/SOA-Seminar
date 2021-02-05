import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { OsvezavacService } from 'src/services/OsvezavacServis';
import { interval } from 'rxjs';

@Component({
  selector: 'app-osvezavac',
  templateUrl: './osvezavac.component.html',
  styleUrls: ['./osvezavac.component.css']
})
export class OsvezavacComponent implements OnInit {

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
  constructor(private vlaznostService : OsvezavacService) { }

  ngOnInit() {
    interval(3000).subscribe(()=>{
      let i;    
      let niz : any[] = [];
    for(i=0;i<this.vlaznostService.temp.length;i++){
      niz.push(this.vlaznostService.temp[i]);
    }
      this.chartDatasets = [
        { data: niz, label: 'Vlaznost Sobe' },
      ];
      this.chartLabels = [];
      for(let i=0;i<niz.length;i++)
          this.chartLabels.push(i+1);
    });
    let i;    
      let niz : any[] = [];
    for(i=0;i<this.vlaznostService.temp.length;i++){
      niz.push(this.vlaznostService.temp[i]);
    }
    this.chartDatasets = [
      { data: niz, label: 'Vlaznost Sobe' },
    ];
    this.chartLabels = [];
    for(let i=0;i<niz.length;i++)
        this.chartLabels.push(i+1);
    
  }

  stanje(){
    if(this.vlaznostService.osvezavacData.stanjeUredjaja == true){
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
    this.vlaznostService.issueCommand(onCommand);
  }

  ugasi(){
    let offCommand : any = {
      vrstaKomande : 0,
      vrednostKomande : 0
    };
    this.vlaznostService.issueCommand(offCommand);
  }

}
