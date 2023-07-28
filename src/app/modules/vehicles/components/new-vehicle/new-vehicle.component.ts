import {Component, Inject, OnInit, OnDestroy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../../../shared/models/misc";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {format} from "date-fns";
import {BookingsService} from "../../../../shared/services/bookings/bookings.service";
import {appConfig} from "../../../../app.config";
import {Vehicle, VehicleType, VehicleCategory} from "../../../../shared/models/vehicle";

@Component({
  selector: 'app-new-vehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.scss']
})
export class NewVehicleComponent implements OnInit, OnDestroy{

  minDate: Date = new Date(2010, 0, 1);
  maxDate: Date = new Date();
  newVehicleForm1: UntypedFormGroup;
  newVehicleForm2: UntypedFormGroup;
  constructor(public dialogRef: MatDialogRef<NewVehicleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private _formBuilder: UntypedFormBuilder,
              private _bookingsService: BookingsService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.newVehicleForm1 = this._formBuilder.group(
      {
        make: [{value: '', disabled: false}, [Validators.required]],
        model: [{value: '', disabled: false}, [Validators.required]],
        date_produced: [{value: format(new Date(), appConfig.dateFormat), disabled: false}, [Validators.required]],
        reg: [{value: '', disabled: false}, [Validators.required]]
      }
    );

    this.newVehicleForm2 = this._formBuilder.group(
      {
        type: [{value: VehicleType.CAR, disabled: false}, [Validators.required]],
        category: [{value: VehicleCategory.OTHER, disabled: false}, [Validators.required]],
        capacity: [{value: 2, disabled: false}, [Validators.required]],
        day_price: [{value: 0, disabled: false}, [Validators.required]],
        picture: [{value: 'default', disabled: true}, [Validators.required]]
      }
    );
  }

  get formControl1() {
    return this.newVehicleForm1.controls;
  }

  get formControl2() {
    return this.newVehicleForm2.controls;
  }

  submitNewVehicle(data) {

  }

  ngOnDestroy() {
  }
}
