import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';

@Injectable({providedIn: 'root'})
export class BoilerService {
    urlBoiler:string = "http://localhost:3000/boilers/"
    public boilerTemp:any = [];
    public temp:any[] = [];
    constructor(private httpClient: HttpClient) {
        interval(3000).subscribe(()=>{
            this.getTemp();
        });
     }
    
     getTemp(){
        this.httpClient.get(this.urlBoiler+"1").subscribe((data:any)=>{
            this.boilerTemp = data;
            this.temp.push(data.Voda);
            if(this.temp.length>10){
                this.temp.splice(0,1);
            }
        });
     }

     ukljuciBoiler(temp:number){
        this.httpClient.get(this.urlBoiler+"ukljuci/"+temp)
        .subscribe(()=>{
            console.log('Boiler Ukljucen');
        })
     }

     ugasiBoiler(){
        this.httpClient.get(this.urlBoiler+"ugasi").subscribe(()=>{
            console.log('Boiler Ugasen');
        })
     }
}