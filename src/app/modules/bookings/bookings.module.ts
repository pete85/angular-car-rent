import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingsComponent} from './components/bookings/bookings.component';
import {BookingsRoutingModule} from "./bookings-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { BookComponent } from './components/book/book.component';
import { BookingComponent } from './components/booking/booking.component';
import {FlexModule} from "@angular/flex-layout";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewBookingComponent } from './components/new-booking/new-booking.component';


@NgModule({
  declarations: [
    BookingsComponent,
    BookComponent,
    BookingComponent,
    NewBookingComponent
  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    SharedModule,
    FlexModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BookingsModule {
}
