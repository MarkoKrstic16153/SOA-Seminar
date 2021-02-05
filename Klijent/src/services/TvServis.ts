import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, interval } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TvService {
    urlTv:string = "http://localhost:3033/tv/"
    public tvData:any = {};
    constructor(private httpClient: HttpClient) {}

    issueCommand(command : any){
        const headers = new HttpHeaders()
        .set('Authorization', 'my-auth-token')
        .set('Content-Type', 'application/json');
        this.httpClient.post(this.urlTv, command, {headers:headers})
            .subscribe(()=>{
                console.log('TV Command Izvrsena!');
            })
    }

    getCurrentChannel(){
        let pom : number =  this.tvData.podatakVrednost.split(" ")[0];
        return pom;
    }

    getCurrentChannelName(){
        let pomNiz = [];
        let pom : String =  this.tvData.podatakVrednost;
        if(pom === "-1 ")
            return "/";
        else {
            pomNiz = pom.split(" ");
            pomNiz[0] = (Number(pom.split(" ")[0]) + 1);
            return pomNiz.join(" ");
        }
    }
}