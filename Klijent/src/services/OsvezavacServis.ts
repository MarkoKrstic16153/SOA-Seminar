import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OsvezavacService {
    urlOsvezavac:string = "http://localhost:3000/osvezavacs/"
    public osvezavacData:any = [];
    public temp:any[] = [];
    constructor(private httpClient: HttpClient) {
        interval(3000).subscribe(()=>{
            this.getTemp();
        });
     }
    
     getTemp(){
        this.httpClient.get(this.urlOsvezavac+"1").subscribe((data:any)=>{
            this.osvezavacData = data;
            this.temp.push(this.osvezavacData.Vlaz);
            if(this.temp.length>10){
                this.temp.splice(0,1);
            }
        });
     }

     ukljuciOsvezavac(temp:number){
        this.httpClient.get(this.urlOsvezavac+"ukljuci/"+temp)
        .subscribe(()=>{
            console.log('Osvezavac Ukljucen');
        })
     }

     ugasiOsvezavac(){
        this.httpClient.get(this.urlOsvezavac+"ugasi").subscribe(()=>{
            console.log('Osvezavac Ugasen');
        })
     }
}