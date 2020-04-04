import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PreciscavacService {
    urlPreciscavac:string = "http://localhost:3000/preciscavacs/"
    public preciscavacData:any = [];
    public temp:any[] = [];
    constructor(private httpClient: HttpClient) {
        interval(3000).subscribe(()=>{
            this.getTemp();
        });
     }
    
     getTemp(){
        this.httpClient.get(this.urlPreciscavac+"1").subscribe((data:any)=>{
            this.preciscavacData = data;
            this.temp.push(this.preciscavacData.Zag);
            if(this.temp.length>10){
                this.temp.splice(0,1);
            }
        });
     }

     ukljuciPreciscavac(){
        this.httpClient.get(this.urlPreciscavac+"ukljuci")
        .subscribe(()=>{
            console.log('Preciscavac Ukljucen');
        })
     }

     ugasiPreciscavac(){
        this.httpClient.get(this.urlPreciscavac+"ugasi").subscribe(()=>{
            console.log('Preciscavac Ugasen');
        })
     }
}