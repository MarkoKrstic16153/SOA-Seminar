import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';

@Injectable({providedIn: 'root'})
export class KlimaService {
    urlKlima:string = "http://localhost:3000/klimas/"
    public klimaTemp:any = [];
    public temp:any[] = [];
    constructor(private httpClient: HttpClient) {
        interval(3000).subscribe(()=>{
            this.getTemp();
        });
     }
    
     getTemp(){
        this.httpClient.get(this.urlKlima+"1").subscribe((data:any)=>{
            console.log(data);
            this.klimaTemp = data;
            this.temp.push(data.Temp);
            if(this.temp.length>10){
                this.temp.splice(0,1);
            }
        });
     }

     ukljuciKlimu(temp:number){
        this.httpClient.get(this.urlKlima+"ukljuci/"+temp)
        .subscribe(()=>{
            console.log('Klima Ukljucena');
        })
     }

     ugasiKlimu(){
        this.httpClient.get(this.urlKlima+"ugasi").subscribe(()=>{
            console.log('Klima Ugasena');
        })
     }
}