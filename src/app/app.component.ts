import {Component, HostListener, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDrawer, MatDrawerMode} from "@angular/material/sidenav";
import {MenuService} from "./shared/services/menu/menu.service";
import {Subscription} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {MenuModel} from "./shared/models/menu";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs/operators";
import {CommonService} from "./shared/services/common/common.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    @ViewChild('drawer') drawer: MatDrawer;
    activeMenuItem: string;
    innerHeight: number;
    innerWidth: number;
    isLoading: boolean;
    menu: MenuModel;
    sidenavMode: MatDrawerMode;
    subMenu$: Subscription;
    subUser$: Subscription;
    subLoading$: Subscription;
    subscriptionList = new Subscription();
    title = 'Vehicle Hire';

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.innerHeight = window.innerHeight;
        this.innerWidth = window.innerWidth;
        this.sidenavMode = 'over';
    }

    constructor(@Inject(DOCUMENT) public document: Document,
                private _menuService: MenuService,
                private _router: Router,
                private _commonService: CommonService,
                private _title: Title) {
        this.onResize();
    }

    ngOnInit() {
        this.getMenu();
        this.getRequestStatus();
        this.getCurrentRoute();
    }

    getCurrentRoute() {
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => {
                    let route: ActivatedRoute = this._router.routerState.root;
                    let routeTitle = '';
                    while (route!.firstChild) {
                        route = route.firstChild;
                    }
                    if (route.snapshot.data['title']) {
                        routeTitle = route!.snapshot.data['title'];
                        this._commonService.publishActiveMenuItem(routeTitle);
                    }
                    return routeTitle;
                })
            )
            .subscribe((title: string) => {
                    if (title) {
                        this._title.setTitle(title);
                        this.activeMenuItem = title;
                    }
                },
                error => {
                    console.error(error);
                },
                () => {
                });
    }

    getMenu() {
        this.subMenu$ = this._menuService.getMenu().subscribe(
            response => {
                if (response) {
                    this.menu = response;
                }
            },
            error => {
                console.error(error);
            },
            () => {
                this.subscriptionList.add(this.subMenu$);
            }
        );
    }

    getRequestStatus() {
        this.subLoading$ = this._commonService.loading$.subscribe(
          response => {
              setTimeout(() => {
                  this.isLoading = response;
              }, 200);
          },
          error => {
              console.error(error);
          },
          () => {
              this.subscriptionList.add(this.subLoading$);
          }
        );
    }

    closeMobileMenu(event) {
        this.drawer.close();
    }

    toggleMenu(event) {
        this.drawer.open();
    }

    ngOnDestroy() {
        this.subscriptionList.unsubscribe();
    }
}
