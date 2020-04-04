import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SijalicaService {
    urlSijalica:string = "http://localhost:3000/sijalicas/"
    public sijalicaData:any = [];
    constructor(private httpClient: HttpClient) {
        interval(3000).subscribe(()=>{
            this.getTemp();
        });
     }
    
     getTemp(){
        this.httpClient.get(this.urlSijalica+"1").subscribe((data:any)=>{
            this.sijalicaData = data;
        });
     }

     ukljuciSijalicu(){
        this.httpClient.get(this.urlSijalica+"ukljuci")
        .subscribe(()=>{
            console.log('Sijalica Ukljucena');
        })
     }

     ugasiSijalicu(){
        this.httpClient.get(this.urlSijalica+"ugasi").subscribe(()=>{
            console.log('Sijalica Ugasena');
        })
     }
}