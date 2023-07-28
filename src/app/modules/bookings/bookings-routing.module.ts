import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {BookingsComponent} from "./components/bookings/bookings.component";
import {BookComponent} from "./components/book/book.component";
import {BookingComponent} from "./components/booking/booking.component";

const routes: Routes = [
    {
        path: '',
        component: BookingsComponent
    },
    {
        path: 'new',
        component: BookComponent
    },
    {
        path: ':id',
        component: BookingComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BookingsRoutingModule {}
