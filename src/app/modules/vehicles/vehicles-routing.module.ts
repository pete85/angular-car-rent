import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {VehiclesComponent} from "./components/vehicles/vehicles.component";

const routes: Routes = [
    {path: '', redirectTo: '/', pathMatch: 'prefix'}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VehiclesRoutingModule {}
