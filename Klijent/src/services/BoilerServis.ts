import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { Command } from 'protractor';
import { HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class BoilerService {
    urlBoiler:string = "http://localhost:3033/boiler";
    public boilerTemp:any = {};
    public temp:any[] = [];
    constructor(private httpClient: HttpClient) {}

    issueCommand(command : any){
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        this.httpClient.post(this.urlBoiler, command, {headers:headers})
            .subscribe(()=>{
                console.log('Boiler Command Izvrsena!');
            })
    }

    dodajNovoMerenje(vrednost){
        this.temp.push(vrednost);
        if(this.temp.length > 30){
            this.temp.shift();
        }
    }
}