import {Component, HostListener, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Vehicle, VehicleType} from "../../../../shared/models/vehicle";
import {Subscription} from "rxjs/internal/Subscription";
import {BookingsService} from "../../../../shared/services/bookings/bookings.service";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit, OnDestroy {

  innerWidth: number;
  innerHeight: number;
  subRemovedVehicle$: Subscription;
  subscriptionList = new Subscription();
  vehicle: Vehicle;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }

  constructor(public dialogRef: MatDialogRef<VehicleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _bookingsService: BookingsService) {
    this.onResize();
  }

  ngOnInit() {
    console.log('Data: ', this.data);
    this.vehicle = this.data.data;
    this.setupVehicle(this.vehicle);
  }

  setupVehicle(vehicle: Vehicle) {
    if (vehicle.type === VehicleType.MOTORCYCLE) {
      vehicle.wheels = 2;
    } else {
      vehicle.wheels = 4;
    }
  }

  removeVehicle(vehicle_id: any) {
    console.log('Vehicle id: ', vehicle_id);
    this.subRemovedVehicle$ = this._bookingsService.removeVehicle(vehicle_id).subscribe(
      response => {
        if (response) {
          this.closeDialog(response);
        }
      },
      error => {
        console.error(error);
      },
      () => {
        this.subscriptionList.add(this.subRemovedVehicle$)
      }
    )
  }

  closeDialog(data): void {
    this.dialogRef.close(data);
  }

  ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }
}
