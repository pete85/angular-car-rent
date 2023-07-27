import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BookingsComponent} from "./components/bookings/bookings.component";

const routes: Routes = [
    {
        path: 'test',
        component: BookingsComponent
    },
    {path: '', redirectTo: '/', pathMatch: 'prefix'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BookingsRoutingModule {}
