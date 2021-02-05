import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { Command } from 'protractor';
import { HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ObavestenjaService {

    //urlEndDay:string = "http://localhost:3033/endday";
    public nizObavestenja : any = [];
    public nizNotifikacija : any = [];

    constructor(private httpClient: HttpClient) {
        this.nizObavestenja = [];
    }

    dodajObavestenje(obavestenje : any){
        this.nizObavestenja.push(obavestenje);
    }

    dodajPrikazNotifikacija(novaNotifikacija:any){
        this.nizNotifikacija.push(novaNotifikacija);
        if(this.nizNotifikacija.length > 15){
            this.nizNotifikacija.shift();
        }
    }

    skloniNotifikaciju(index: number) {
        this.nizNotifikacija.splice(this.nizNotifikacija.length - index - 1, 1);
    }

    ocisti() {
        this.nizNotifikacija = [];
    }
}