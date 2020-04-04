import { Component, OnInit } from '@angular/core';
import { TvService } from 'src/services/TvServis';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {

  constructor(private tvService : TvService) { }

  ngOnInit() {
  }

  ukljuci(){
    this.tvService.ukljuciTv1();
  }

  ugasi(){
    this.tvService.ugasiTv1();
  }

}
