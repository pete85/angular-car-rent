import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingsComponent} from './components/bookings/bookings.component';
import {BookingsRoutingModule} from "./bookings-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { BookComponent } from './components/book/book.component';
import { BookingComponent } from './components/booking/booking.component';


@NgModule({
  declarations: [
    BookingsComponent,
    BookComponent,
    BookingComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    SharedModule
  ]
})
export class BookingsModule {
}