import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {MenuModel} from '../../models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private _http: HttpClient) { }

  getMenu(): Observable<MenuModel> {
    return this._http.get<MenuModel>('/assets/menu.json');
  }
}
