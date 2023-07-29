import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../../../shared/models/misc";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {BookingsService} from "../../../../shared/services/bookings/bookings.service";
import {Vehicle, VehicleCategory, VehicleType} from "../../../../shared/models/vehicle";
import {CurrencyPipe} from "@angular/common";
import {Subscription} from "rxjs/internal/Subscription";
import {error} from "@angular/compiler-cli/src/transformers/util";

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
  newVehicleForm3: UntypedFormGroup;
  subNewVehicle$: Subscription;
  subscriptionList = new Subscription();
  vehicleCategories: VehicleCategory[];
  vehicleTypes: VehicleType[];
  constructor(public dialogRef: MatDialogRef<NewVehicleComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private _formBuilder: UntypedFormBuilder,
              private _bookingsService: BookingsService,
              private _currencyPipe: CurrencyPipe) {
  }

  ngOnInit() {
    this.setVehicleTypes();
    this.setVehicleCategories();
    this.buildForm();
  }

  setVehicleTypes() {
    this.vehicleTypes = [];
    for (let item of Object.values(VehicleType)) {
      this.vehicleTypes.push(item);
    }
  }

  setVehicleCategories() {
    this.vehicleCategories = [];
    for (let item of Object.values(VehicleCategory)) {
      this.vehicleCategories.push(item);
    }
  }

  buildForm() {
    this.newVehicleForm1 = this._formBuilder.group(
      {
        make: [{value: '', disabled: false}, [Validators.required]],
        model: [{value: '', disabled: false}, [Validators.required]],
        date_produced: [{value: new Date(), disabled: false}, [Validators.required]]
      }
    );

    this.newVehicleForm2 = this._formBuilder.group(
      {
        reg: [{value: '', disabled: false}, [Validators.required]],
        type: [{value: VehicleType.CAR, disabled: false}, [Validators.required]],
        category: [{value: VehicleCategory.OTHER, disabled: false}, [Validators.required]],
      }
    );

    this.newVehicleForm3 = this._formBuilder.group(
      {
        capacity: [{value: 2, disabled: false}, [Validators.required]],
        color: [{value: '', disabled: false}, [Validators.required]],
        day_price: [{value: this._currencyPipe.transform(0,'GBP', 'symbol', '1.2-2'), disabled: false}, [Validators.required]],
      }
    );
  }

  get formControl1() {
    return this.newVehicleForm1.controls;
  }

  get formControl2() {
    return this.newVehicleForm2.controls;
  }

  get formControl3() {
    return this.newVehicleForm3.controls;
  }

  submitNewVehicle() {
    const payload = {
      make: this.formControl1.make.value,
      model: this.formControl1.model.value,
      date_produced: this.formControl1.date_produced.value,
      reg: this.formControl2.reg.value,
      type: this.formControl2.type.value,
      category: this.formControl2.category.value,
      capacity: this.formControl3.capacity.value,
      color: this.formControl3.color.value,
      day_price: Number(this.formControl3.day_price.value.replace(/[^0-9.-]+/g,"")),
      picture: 'default'
    }
    this.subNewVehicle$ = this._bookingsService.addVehicle(payload).subscribe(
      response => {
        if (response) {
          this.closeDialog(response);
        }
      },
      error => {
        console.error(error);
      },
      () => {
        this.subscriptionList.add(this.subNewVehicle$);
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
