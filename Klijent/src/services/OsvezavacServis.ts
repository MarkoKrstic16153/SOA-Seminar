import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class OsvezavacService {
    urlOsvezavac:string = "http://localhost:3033/osvezavac/"
    public osvezavacData:any = {};
    public temp:any[] = [];
    constructor(private httpClient: HttpClient) {}

    issueCommand(command : any){
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        this.httpClient.post(this.urlOsvezavac, command, {headers:headers})
            .subscribe(()=>{
                console.log('Osvezavac Command Izvrsena!');
            })
    }

    dodajNovoMerenje(vrednost){
        this.temp.push(vrednost);
        if(this.temp.length > 30){
            this.temp.shift();
        }
    }
}