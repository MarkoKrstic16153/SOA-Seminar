import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class SijalicaService {
    urlSijalica:string = "http://localhost:3033/sijalica/"
    public sijalicaData:any = {};
    constructor(private httpClient: HttpClient) {}

    issueCommand(command : any){
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        this.httpClient.post(this.urlSijalica, command, {headers:headers})
            .subscribe(()=>{
                console.log('Sijalica Command Izvrsena!');
            })
    }
}