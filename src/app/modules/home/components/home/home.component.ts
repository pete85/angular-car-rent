import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Tile} from "../../../../shared/models/tile";
import {appColours, appConfig} from "../../../../app.config";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  columns: number;
  gridGutter: string;
  innerWidth: number;
  innerHeight: number;
  rowHeight: string;
  showOptions: boolean;

  tiles: Tile[] = [
    {title: 'Vehicles', cols: 2, rows: 2, color: appColours.darkGreyRGBA, linkUrl: '/vehicles', image: 'toyota-supra'},
    {title: 'Bookings', cols: 2, rows: 2, color: appColours.darkGreyRGBA, linkUrl: '/bookings', image: 'bookings'},
    {title: 'Book Now', cols: 2, rows: 2, color: appColours.darkGreyRGBA, linkUrl: '/bookings/new', image: 'carkey'}
  ];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.columns = 6;
    this.rowHeight = '120px';
    this.gridGutter = '20px';
    this.setTiles(this.tiles);
  }

  constructor(private _router: Router) {
    this.onResize();
  }

  ngOnInit() {
    setTimeout(() => {
      this.showOptions = true;
    }, 4000);
  }

  setTiles(tiles: Tile[]) {
    if (this.innerWidth > 960) {
      tiles.forEach(el => {
        el.cols = 2
      });
    } else if (this.innerWidth > 600 && this.innerWidth <= 960) {
      tiles.forEach(el => {
        el.cols = 3
      });
    } else {
      tiles.forEach(el => {
        el.cols = 6
      });
    }
  }
}
