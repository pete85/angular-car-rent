import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {Booking} from "../../../../shared/models/booking";
import {addDays, addMonths, addWeeks, format, isBefore} from "date-fns";
import {BookingsService} from "../../../../shared/services/bookings/bookings.service";
import {appColours, appConfig} from "../../../../app.config";
import {Tile} from "../../../../shared/models/tile";
import {Vehicle} from "../../../../shared/models/vehicle";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, OnDestroy {

  bookings: Booking[];
  columns: number;
  gridGutter: string;
  filters: any = {};
  innerWidth: number;
  innerHeight: number;
  rowHeight: string;
  subNewBooking$: Subscription;
  subAvailability$: Subscription;
  subscriptionList = new Subscription();
  tiles: Tile[];
  today: Date = new Date();
  maxDate: Date = addMonths(this.today, 6);
  vehiclesCount: number;
  vehicles: Vehicle[];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.columns = 6;
    this.rowHeight = '130px';
    this.gridGutter = '20px';
    if (this.vehicles) {
      this.setTiles(this.tiles);
    }
  }

  constructor(private _bookingsService: BookingsService) {
    this.onResize();
  }

  ngOnInit() {
    this.filters = {
      start_date: addDays(new Date(), 1),
      end_date: addDays(new Date(), 2),
    }
    this.getAvailability(this.filters);
  }

  setTiles(tiles: Tile[]) {
    if (this.innerWidth > 960) {
      tiles.forEach(el => {
        el.cols = 2
      });
    } else if (this.innerWidth > 600 && this.innerWidth <= 960) {
      tiles.forEach(el => {
        el.cols = 3
      });
    } else {
      tiles.forEach(el => {
        el.cols = 6
      });
    }
  }

  updateEndDate() {
    if (isBefore(this.filters.end_date, this.filters.start_date)) {
      this.filters.end_date = addDays(this.filters.start_date, 1);
    }
    this.getAvailability(this.filters);
  }

  getAvailability(filters) {
    this.tiles = [];

    const filtersFormatted = {
      start_date: format(filters.start_date, appConfig.dateLongFormat),
      end_date: format(filters.end_date, appConfig.dateLongFormat)
    }

    this.subAvailability$ = this._bookingsService.getAvailability(filtersFormatted).subscribe(
      response => {
        if (response) {
          this.vehicles = response;
          this.vehiclesCount = response.length;
          response.forEach(el => {
            this.tiles.push({
              title: el.make,
              subTitle: el.model,
              cols: this.innerWidth > 960 ? 2 : this.innerWidth > 600 ? 3 : 6,
              rows: 2,
              color: appColours.darkGreyRGBA,
              image: el.picture,
              vehicle: el
            });
          });
        }
      },
      error => {
        console.error(error);
      },
      () => {
        this.subscriptionList.add(this.subAvailability$);
      }
    );
  }

  ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }
}
