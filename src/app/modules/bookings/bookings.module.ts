import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingsComponent} from './components/bookings/bookings.component';
import {BookingsRoutingModule} from "./bookings-routing.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    BookingsComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    SharedModule
  ]
})
export class BookingsModule {
}
