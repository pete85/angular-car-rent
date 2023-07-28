import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VehiclesComponent} from './components/vehicles/vehicles.component';
import {SharedModule} from "../../shared/shared.module";
import {VehiclesRoutingModule} from "./vehicles-routing.module";
import {FlexModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    VehiclesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VehiclesRoutingModule,
    FlexModule,
    FormsModule
  ]
})
export class VehiclesModule {
}
