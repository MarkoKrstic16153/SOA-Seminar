import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TvService {
    urlTv:string = "http://localhost:3000/tvs/"
    public tvData:any = [];
    constructor(private httpClient: HttpClient) {
        interval(3000).subscribe(()=>{
            this.getTemp();
        });
     }
    
     getTemp(){
        this.httpClient.get(this.urlTv+"1").subscribe((data:any)=>{
            this.tvData = data;
        });
     }

     ukljuciTv1(){
        this.httpClient.get(this.urlTv+"ukljucitv")
        .subscribe(()=>{
            console.log('Tv Ukljucen');
        })
     }

     ugasiTv1(){
        this.httpClient.get(this.urlTv+"ugasitv").subscribe(()=>{
            console.log('Tv Ugasen');
        })
     }
}