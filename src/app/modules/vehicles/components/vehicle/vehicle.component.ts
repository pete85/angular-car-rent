import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Vehicle, VehicleType} from "../../../../shared/models/vehicle";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  innerWidth: number;
  innerHeight: number;
  vehicle: Vehicle;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
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
}
