import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {Booking} from "../../../../shared/models/booking";
import {BookingsService} from "../../../../shared/services/bookings/bookings.service";
import {Router} from "@angular/router";
import {differenceInDays} from "date-fns";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit, OnDestroy {
  booking_id: string;
  duration: any;
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
    this.booking_id = this._router.url.split('/')[2];
    this.getBooking(this.booking_id);
  }

  getBooking(booking_id) {
    this.subBooking$ = this._bookingsService.getBooking(booking_id).subscribe(
      response => {
        if (response) {
          this.booking = response;
          console.log(response.start_date);
          if (response.start_date && response.end_date) {
            this.duration = differenceInDays(new Date(response.end_date), new Date(response.start_date));
          }
          console.log('Duration: ', this.duration);
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
