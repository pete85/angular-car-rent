import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {Vehicle, VehicleType, VehicleCategory} from "../../models/vehicle";

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
}
