import {
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import {Subscription} from 'rxjs/internal/Subscription';
import {MenuModel} from '../../models/menu';
import {CommonService} from '../../services/common/common.service';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnChanges, OnDestroy {

    @Input() menu: MenuModel;
    @Input() currentUser: string;
    @Output() activeItem: EventEmitter<string> = new EventEmitter<string>();
    @Output() menuClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() menuToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
    activeMenuItem: string;
    fullMenu: boolean;
    innerWidth: number;
    panelOpenState: boolean;
    subActiveMenuItem$: Subscription;
    subscriptionList = new Subscription();

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.innerWidth = window.innerWidth;
        if (this.innerWidth <= 600 && this.fullMenu) {
            this.toggleMenuView(false);
        }
    }

    constructor(private _commonService: CommonService,
                private _title: Title,
                private _router: Router) {
        this.onResize();
        this.fullMenu = false;
    }

    ngOnInit() {
        this.panelOpenState = true;
    }

    getActiveMenuItem(menu) {
        this.subActiveMenuItem$ = this._commonService.activeMenuItem$.subscribe(
            response => {
                if (response) {
                    this.activeMenuItem = response;
                    menu.currentValue.entries.forEach((el, index) => {
                        if (!this.activeMenuItem && index === 0) {
                            el.active = true;
                        } else {
                            el.active = el.name === this.activeMenuItem;
                        }
                    });
                }
            }, error => {
                console.error(error);
            },
            () => {
                this.subscriptionList.add(this.subActiveMenuItem$);
            }
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.menu) {
            this.getActiveMenuItem(changes.menu);
        }
    }

    toggleMenuView(fullMenu) {
        this.menuClosed.emit(true);
        setTimeout(() => {
            this.fullMenu = fullMenu;
        }, 400);
        setTimeout(() => {
            this.menuToggled.emit(fullMenu);
        }, 450);
    }

    toggleMobileMenu(closedValue: boolean) {
        this.menuClosed.emit(closedValue);
    }

    selectNavigationParent(menuName) {
        localStorage.setItem('menuItem', menuName);
        if (this.menu && this.menu.entries) {
            this.menu.entries.forEach(el => {
                if (el.name === menuName) {
                    el.active = true;
                    this.activeItem.emit(el.name);
                } else {
                    el.active = false;
                }
            });
        }
        // this.toggleMenuView(openFullMenu);
        this.menuClosed.emit(true);
    }

    ngOnDestroy() {
        this.subscriptionList.unsubscribe();
    }
}
