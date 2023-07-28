import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {BookingsService} from "../../../../shared/services/bookings/bookings.service";
import {Vehicle} from "../../../../shared/models/vehicle";
import {Subscription} from "rxjs/internal/Subscription";
import {Tile} from "../../../../shared/models/tile";
import {appColours, appConfig} from "../../../../app.config";
import {format, isEqual, parseISO} from 'date-fns';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit, OnDestroy {
  columns: number;
  gridGutter: string;
  innerWidth: number;
  innerHeight: number;
  filters: any = {};
  rowHeight: string;
  subVehicles$: Subscription;
  subscriptionList = new Subscription();
  tiles: Tile[];
  vehicles: Vehicle[];
  yearFrom: string;
  yearOptions: string[];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.columns = 6;
    this.rowHeight = '120px';
    this.gridGutter = '20px';
  }
  constructor(private _bookingsService: BookingsService) {
    this.onResize();
  }

  ngOnInit() {
    this.yearOptions = this.setYearFromOptions();
    this.getVehicles(this.filters);
  }

  setYearFromOptions() {
    let yearsArray: string[] = [];
    const yearStart: number = 2010;
    const yearEnd: number = parseInt(format(new Date(), 'yyyy'));
    const counter = yearEnd - yearStart;

    for (let i = 0; i <= counter; i++) {
      yearsArray.push((yearStart + i).toString());
    }
    // this.filters.yearFrom = yearsArray[0];
    return yearsArray;
  }

  setYearFrom(yearSelected) {
    console.log('Year selected: ', yearSelected);
    this.filters.minyear = yearSelected;
    console.log('Filters: ', this.filters);
    this.getVehicles(this.filters);
  }

  displayFn(person): string {
    return person && (person.firstname || person.lastName) ? (person.firstName).concat(' ', person.lastName) : 'All';
  }

  private _filterByMake(make): Vehicle[] {
    return this.vehicles.filter(
      (option) => (option.make == make.make)
    );
  }

  getVehicles(filters) {
    this.tiles = [];
    this.subVehicles$ = this._bookingsService.getVehicles(filters).subscribe(
      response => {
        if (response) {
          this.vehicles = response;
          console.log('Response: ', response);
          response.forEach(el => {
            this.tiles.push({
              title: el.make,
              subTitle: el.model,
              cols: this.innerWidth > 960 ? 2 : this.innerWidth > 600 ? 3 : 6,
              rows: 2,
              color: appColours.darkGreyRGBA,
              linkUrl: '/vehicles',
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
        this.subscriptionList.add(this.subVehicles$);
      }
    );
  }
  ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }
}
