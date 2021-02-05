import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material.module";
import { TvComponent } from './components/tv/tv.component';
import { SijaliceComponent } from './components/sijalice/sijalice.component';
import { BoilerComponent } from './components/boiler/boiler.component';
import { KlimaComponent } from './components/klima/klima.component';
import { PreciscavacComponent } from './components/preciscavac/preciscavac.component';
import { OsvezavacComponent } from './components/osvezavac/osvezavac.component';
import { PotrosnjaComponent } from './components/potrosnja/potrosnja.component';
import { HomeComponent } from './components/home/home.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChartsModule } from "ng2-charts";
import { StatistikaComponent } from './components/statistika/statistika.component';
import { ObavestenjaComponent } from './components/obavestenja/obavestenja.component';
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    TvComponent,
    SijaliceComponent,
    BoilerComponent,
    KlimaComponent,
    PreciscavacComponent,
    OsvezavacComponent,
    PotrosnjaComponent,
    HomeComponent,
    StatistikaComponent,
    ObavestenjaComponent
  ],
  imports: [
    SocketIoModule.forRoot(config),
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
