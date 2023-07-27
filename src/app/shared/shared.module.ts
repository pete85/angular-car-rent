import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CapitalisePipe } from './pipes/capitalise/capitalise.pipe';
import { NavigationComponent } from './components/navigation/navigation.component';
import {RouterLink, RouterLinkActive} from "@angular/router";

@NgModule({
  imports: [
    MaterialModule,
    RouterLink,
    RouterLinkActive
  ],
    exports: [
        MaterialModule,
        CapitalisePipe
    ],
  declarations: [
    PageNotFoundComponent,
    CapitalisePipe,
    NavigationComponent
  ]
})

export class SharedModule {
}
