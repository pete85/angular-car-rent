import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs/internal/Subscription";
import {VehicleCategory, VehicleType} from "../../../../shared/models/vehicle";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../../../shared/models/misc";
import {BookingsService} from "../../../../shared/services/bookings/bookings.service";
import {CurrencyPipe} from "@angular/common";
import {Customer} from "../../../../shared/models/customer";
import {subYears} from "date-fns";
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.scss']
})
export class NewBookingComponent implements OnInit, OnDestroy {

  @ViewChild('stepper') private myStepper: MatStepper;

  customers: Customer[];
  filters: any = {};
  minDate: Date = new Date(2010, 0, 1);
  maxDate: Date = subYears(new Date(), 16);
  newBookingForm1: UntypedFormGroup;
  newBookingForm2: UntypedFormGroup;
  newBookingForm3: UntypedFormGroup;
  selectedCustomer: Customer;
  stepperIndex: number;
  subCustomers$: Subscription;
  subNewBooking$: Subscription;
  subNewCustomer$: Subscription;
  subscriptionList = new Subscription();
  vehicleCategories: VehicleCategory[];
  vehicleTypes: VehicleType[];

  constructor(public dialogRef: MatDialogRef<NewBookingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private _formBuilder: UntypedFormBuilder,
              private _bookingsService: BookingsService,
              private _currencyPipe: CurrencyPipe) {
  }

  ngOnInit() {
    console.log('data: ', this.data);
    this.buildForm();
  }

  getCustomers(filters) {
    this.subCustomers$ = this._bookingsService.getCustomers(filters).subscribe(
      response => {
        if (response) {
          this.customers = response;
          console.log('Customers: ', this.customers);
        }
      },
      error => {
        console.error(error);
      },
      () => {
        this.subscriptionList.add(this.subCustomers$);
      }
    );
  }

  buildForm() {
    this.newBookingForm1 = this._formBuilder.group(
      {
        first_name: [{value: '', disabled: false}, [Validators.required]],
        last_name: [{value: '', disabled: false}, [Validators.required]],
        date_of_birth: [{value: '', disabled: false}, [Validators.required]],
        email: [{value: '', disabled: false}, [Validators.required]],
        phone: [{value: '', disabled: false}, [Validators.required]],
        address_1: [{value: '', disabled: false}, [Validators.required]],
        address_2: [{value: '', disabled: false}],
        postcode: [{value: '', disabled: false}, [Validators.required]],
        county: [{value: '', disabled: false}],
      }
    );

    this.newBookingForm2 = this._formBuilder.group(
      {
        start_time: [{value: '', disabled: false}, [Validators.required]],
        type: [{value: VehicleType.CAR, disabled: false}, [Validators.required]],
        category: [{value: VehicleCategory.OTHER, disabled: false}, [Validators.required]],
      }
    );
  }

  get formControl1() {
    return this.newBookingForm1.controls;
  }

  get formControl2() {
    return this.newBookingForm2.controls;
  }

  selectCustomer(customer: Customer) {
    console.log('Selected customer: ', customer);
    this.selectedCustomer = customer;
    this.myStepper.selectedIndex = this.myStepper._steps.length-1;
  }

  addCustomer() {
    let payload: Customer;

    payload = {
      first_name: this.formControl1.first_name.value,
      last_name: this.formControl1.last_name.value,
      date_of_birth: this.formControl1.date_of_birth.value,
      email: this.formControl1.email.value,
      phone: this.formControl1.phone.value,
      address_1: this.formControl1.address_1.value,
      address_2: this.formControl1.address_2.value,
      postcode: this.formControl1.postcode.value,
      county: this.formControl1.county.value,
    };

    this.subNewCustomer$ = this._bookingsService.addCustomer(payload).subscribe(
      response => {
        if (response) {
          this.selectedCustomer = response;
          this.myStepper.next();
        }
      },
      error => {
        console.error(error);
      },
      () => {
        this.subscriptionList.add(this.subNewCustomer$);
      }
    );
  }

  createBooking() {

  }

  closeDialog(data): void {
    this.dialogRef.close(data);
  }

  ngOnDestroy() {
    this.subscriptionList.unsubscribe();
  }
}
