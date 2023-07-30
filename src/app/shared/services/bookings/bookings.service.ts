import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Vehicle, VehicleType, VehicleCategory} from "../../models/vehicle";
import {Booking} from "../../models/booking";

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  baseUrl: string = environment.baseUrl;
  headers: HttpHeaders;

  constructor(private _http: HttpClient) {
    this.headers = new HttpHeaders().set("Content-Type", 'application/json');
  }

  getVehicles(queryParams): Observable<Vehicle[]> {
    let params = new HttpParams();

    if (queryParams.make) {
      params = params.append('make', queryParams.make);
    }

    if (queryParams.model) {
      params = params.append('model', queryParams.model);
    }

    if (queryParams.minyear) {
      params = params.append('minyear', queryParams.minyear);
    }

    return this._http.get<Vehicle[]>(
      `${this.baseUrl}/vehicles`, {headers: this.headers, params: params}
    )
  }

  addVehicle(payload: Vehicle): Observable<Vehicle> {
    return this._http.post<Vehicle>(
      `${this.baseUrl}/vehicles`, payload, {headers: this.headers}
    )
  }

  removeVehicle(vehicle_id: string): Observable<Vehicle> {
    return this._http.delete<Vehicle>(
      `${this.baseUrl}/vehicles/${vehicle_id}`, {headers: this.headers}
    )
  }

  getBookings(queryParams): Observable<Booking[]> {
    let params = new HttpParams();

    if (queryParams.start_date) {
      params = params.append('start_date', queryParams.start_date);
    }

    if (queryParams.end_date) {
      params = params.append('end_date', queryParams.end_date);
    }

    return this._http.get<Booking[]>(
      `${this.baseUrl}/vehicle-bookings`, {headers: this.headers, params: params}
    )
  }

  getBooking(booking_id): Observable<Booking> {
    return this._http.get<Booking>(
      `${this.baseUrl}/vehicle-bookings/${booking_id}`, {headers: this.headers}
    )
  }
}
