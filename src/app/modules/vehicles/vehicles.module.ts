import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VehiclesComponent} from './components/vehicles/vehicles.component';
import {SharedModule} from "../../shared/shared.module";
import {VehiclesRoutingModule} from "./vehicles-routing.module";
import {FlexModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewVehicleComponent } from './components/new-vehicle/new-vehicle.component';


@NgModule({
  declarations: [
    VehiclesComponent,
    NewVehicleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    VehiclesRoutingModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VehiclesModule {
}
