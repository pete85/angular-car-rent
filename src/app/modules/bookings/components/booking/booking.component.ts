import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {Booking} from "../../../../shared/models/booking";
import {BookingsService} from "../../../../shared/services/bookings/bookings.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit, OnDestroy {
  booking_id: string;
  href: string;
  innerWidth: number;
  innerHeight: number;
  subBooking$: Subscription;
  subscriptionList = new Subscription();
  booking: Booking;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  constructor(private _bookingsService: BookingsService,
              private _router: Router) {
    this.onResize();
  }

  ngOnInit() {
    this.href = this._router.url;
    this.booking_id = this.href.split('/')[2];
    this.getBooking(this.booking_id);
  }

  getBooking(booking_id) {
    this.subBooking$ = this._bookingsService.getBooking(booking_id).subscribe(
      response => {
        if (response) {
          console.log('RES: ', response);
        }
      },
      error => {
        console.error(error);
      },
      () => {
        this.subscriptionList.add(this.subBooking$);
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }
}
