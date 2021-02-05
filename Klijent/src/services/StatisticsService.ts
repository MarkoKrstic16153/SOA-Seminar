import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { Command } from 'protractor';
import { HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class StatisticsService {

    urlEndDay:string = "http://localhost:3033/endday";
    urlAllDays:string = "http://localhost:3033/statistics";

    allDays:any[] = [];
    totalDays:any[] = [];

    constructor(private httpClient: HttpClient) {}

    endDay(){
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        this.httpClient.post(this.urlEndDay, {}, {headers:headers})
            .subscribe(()=>{
                console.log('End Command Command Izvrsena!');
            })
    }

    getAllDays():Observable<any>{
        return this.httpClient.get(this.urlAllDays);
    }
}