import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/internal/Subscription";
import {Booking} from "../../../../shared/models/booking";
import {addDays, addMonths, addWeeks, differenceInDays, format, isBefore} from "date-fns";
import {BookingsService} from "../../../../shared/services/bookings/bookings.service";
import {appColours, appConfig} from "../../../../app.config";
import {Tile} from "../../../../shared/models/tile";
import {Vehicle} from "../../../../shared/models/vehicle";
import {NewVehicleComponent} from "../../../vehicles/components/new-vehicle/new-vehicle.component";
import {MatDialog} from "@angular/material/dialog";
import {NewBookingComponent} from "../new-booking/new-booking.component";
import {Router} from "@angular/router";

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
  totalPrice: number;
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

  constructor(private _bookingsService: BookingsService,
              public dialog: MatDialog,
              private _router: Router) {
    this.onResize();
  }

  ngOnInit() {
    this.filters = {
      start_date: addDays(new Date(), 1),
      end_date: addDays(new Date(), 2),
      start_time: '12:00',
      end_time: '12:00',
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

  openNewBookingDialog(selected_vehicle: any) {

    const dialogRef = this.dialog.open(NewBookingComponent, {
      width: '600px',
      maxWidth: '100%',
      data: {
        name: `Book ${selected_vehicle.make} ${selected_vehicle.model}`,
        vehicle: selected_vehicle,
        filters: this.filters,
        price: this.calculateTotalPrice(selected_vehicle.day_price, this.filters.start_date, this.filters.end_date)
      }
    });
    this.subNewBooking$ = dialogRef.afterClosed().subscribe(
      response => {
        if (response) {
          this._router.navigate([`/bookings`]);
        }
      },
      error => {
        console.error(error);
      },
      () => {
        this.subscriptionList.add(this.subNewBooking$);
      }
    )
  }

  calculateTotalPrice(vehicle_price, start_date, end_date) {
    return differenceInDays(end_date, start_date) * vehicle_price;
  }

  ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }
}
