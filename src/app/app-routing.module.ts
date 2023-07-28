import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/components/page-not-found/page-not-found.component';
import {HomeComponent} from "./modules/home/components/home/home.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'home',
    data: {title: 'home'}
  },
  {
    path: 'bookings',
    title: 'bookings',
    data: {title: 'bookings'},
    loadChildren: () => import('./modules/bookings/bookings.module').then(m => m.BookingsModule),
    canActivate: []
  },
  {
    path: 'vehicles',
    title: 'vehicles',
    data: {title: 'vehicles'},
    loadChildren: () => import('./modules/vehicles/vehicles.module').then(m => m.VehiclesModule),
    canActivate: []
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
