import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {CapitalisePipe} from './pipes/capitalise/capitalise.pipe';
import {NavigationComponent} from './components/navigation/navigation.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FlexModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    MaterialModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FlexModule
  ],
  exports: [
    MaterialModule,
    CapitalisePipe,
    NavigationComponent,
    CommonModule
  ],
  declarations: [
    PageNotFoundComponent,
    CapitalisePipe,
    NavigationComponent
  ]
})

export class SharedModule {
}
