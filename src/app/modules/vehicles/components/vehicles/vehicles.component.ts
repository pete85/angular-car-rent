import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {BookingsService} from "../../../../shared/services/bookings/bookings.service";
import {Vehicle} from "../../../../shared/models/vehicle";
import {Subscription} from "rxjs/internal/Subscription";
import {Tile} from "../../../../shared/models/tile";
import {appColours, appConfig} from "../../../../app.config";
import {format, isEqual, parseISO} from 'date-fns';
import {MatDialog} from "@angular/material/dialog";
import {NewVehicleComponent} from "../new-vehicle/new-vehicle.component";
import {VehicleComponent} from "../vehicle/vehicle.component";

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
  subNewVehicleDialog$: Subscription;
  subVehicle$: Subscription;
  subVehicles$: Subscription;
  subscriptionList = new Subscription();
  tiles: Tile[];
  vehicles: Vehicle[];
  vehiclesCount: number;
  yearOptions: string[];

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
              public dialog: MatDialog) {
    this.onResize();
  }

  ngOnInit() {
    this.yearOptions = this.setYearFromOptions();
    this.getVehicles(this.filters);
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

  setYearFromOptions() {
    let yearsArray: string[] = [];
    const yearStart: number = 2010;
    const yearEnd: number = parseInt(format(new Date(), 'yyyy'));
    const counter = yearEnd - yearStart;

    for (let i = 0; i <= counter; i++) {
      yearsArray.push((yearStart + i).toString());
    }
    return yearsArray;
  }

  getVehicles(filters) {
    this.tiles = [];
    this.subVehicles$ = this._bookingsService.getVehicles(filters).subscribe(
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

          this.tiles.push({
            title: 'Add new',
            subTitle: 'vehicle',
            cols: this.innerWidth > 960 ? 2 : this.innerWidth > 600 ? 3 : 6,
            rows: 2,
            color: appColours.darkGreyRGBA,
            image: '',
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

  openVehicleDialog(vehicle: Vehicle) {
    const dialogRef = this.dialog.open(VehicleComponent, {
      width: '90%',
      maxWidth: '100%',
      id: 'vehicle-dialog',
      hasBackdrop: true,
      backdropClass: 'blurred-backdrop',
      data: {
        name: `${vehicle.make} ${vehicle.model}`,
        data: vehicle
      }
    });
    this.subVehicle$ = dialogRef.afterClosed().subscribe(
      response => {
        if (response) {
          this.getVehicles(this.filters);
        }
      },
      error => {
        console.error(error);
      },
      () => {
        this.subscriptionList.add(this.subVehicle$);
      }
    )
  }

  openNewVehicleDialog() {
    const dialogRef = this.dialog.open(NewVehicleComponent, {
      width: '600px',
      maxWidth: '100%',
      data: {
        name: 'New vehicle'
      }
    });
    this.subNewVehicleDialog$ = dialogRef.afterClosed().subscribe(
      response => {
        if (response) {
          this.getVehicles(this.filters);
        }
      },
      error => {
        console.error(error);
      },
      () => {
        this.subscriptionList.add(this.subNewVehicleDialog$);
      }
    )
  }

  ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }
}
