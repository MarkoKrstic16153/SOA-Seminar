import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TvComponent } from './components/tv/tv.component';
import { BoilerComponent } from './components/boiler/boiler.component';
import { KlimaComponent } from './components/klima/klima.component';
import { PreciscavacComponent } from './components/preciscavac/preciscavac.component';
import { OsvezavacComponent } from './components/osvezavac/osvezavac.component';
import { SijaliceComponent } from './components/sijalice/sijalice.component';
import { PotrosnjaComponent } from './components/potrosnja/potrosnja.component';
import { HomeComponent } from './components/home/home.component';
import { ObavestenjaComponent } from './components/obavestenja/obavestenja.component';
import { StatistikaComponent } from './components/statistika/statistika.component';


const routes: Routes = [
  { path: "tv", component: TvComponent },
  { path: "boiler", component: BoilerComponent },
  { path: "klima", component: KlimaComponent },
  { path: "preciscavac", component: PreciscavacComponent },
  { path: "osvezavac", component: OsvezavacComponent },
  { path: "sijalice", component: SijaliceComponent },
  { path: "potrosnja", component: PotrosnjaComponent },
  { path: "statistika", component: StatistikaComponent },
  { path: "obavestenja", component: ObavestenjaComponent },
  { path: "", component:  HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
