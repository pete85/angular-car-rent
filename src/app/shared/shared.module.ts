import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {CapitalisePipe} from './pipes/capitalise/capitalise.pipe';
import {NavigationComponent} from './components/navigation/navigation.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {CommonModule, CurrencyPipe} from "@angular/common";
import {FlexModule} from "@angular/flex-layout";
import {TruncatePipe} from './pipes/truncate/truncate.pipe';

@NgModule({
  imports: [
    MaterialModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FlexModule
  ],
  declarations: [
    PageNotFoundComponent,
    CapitalisePipe,
    NavigationComponent,
    TruncatePipe
  ],
  exports: [
    MaterialModule,
    CapitalisePipe,
    NavigationComponent,
    CommonModule,
    TruncatePipe
  ],
  providers: [
    CurrencyPipe
  ]
})

export class SharedModule {
}
