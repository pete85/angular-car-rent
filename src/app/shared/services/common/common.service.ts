import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    private _loadingSubject = new BehaviorSubject<boolean>(true);
    public loading$ = this._loadingSubject.asObservable();
    private _activeMenuItemSubject = new BehaviorSubject<string>('home');
    public activeMenuItem$ = this._activeMenuItemSubject.asObservable();

    constructor() {
    }

    toggleLoader(isLoading: boolean) {
        this._loadingSubject.next(isLoading);
    }

    publishActiveMenuItem(menuItem: string) {
        this._activeMenuItemSubject.next(menuItem);
    }

}
