import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {Booking} from "../../../../shared/models/booking";
import {BookingsService} from "../../../../shared/services/bookings/bookings.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})

export class BookingsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['reference', 'email', 'vehicle', 'start_date', 'end_date', 'price'];
  innerWidth: number;
  innerHeight: number;
  subBookings$: Subscription;
  subscriptionList = new Subscription();
  bookings: Booking[];
  filters: any = {};

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  constructor(private _bookingsService: BookingsService,
              public dialog: MatDialog) {
    this.onResize();
  }
  ngOnInit() {
    this.getBookings(this.filters);
  }

  getBookings(filters) {
    this.subBookings$ = this._bookingsService.getBookings(filters).subscribe(
      response => {
        if (response) {
          this.bookings = response;
          console.log('Response: ', response);

        }
      },
      error => {
        console.error(error);
      },
      () => {
        this.subscriptionList.add(this.subBookings$);
      }
    )
  }

  ngOnDestroy() {
  }

}
