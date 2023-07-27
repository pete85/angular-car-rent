import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {RouterLink} from "@angular/router";
import {HomeModule} from "./modules/home/home.module";
import {BookingsModule} from "./modules/bookings/bookings.module";
import {VehiclesModule} from "./modules/vehicles/vehicles.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterLink,
    HomeModule,
    BookingsModule,
    VehiclesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
