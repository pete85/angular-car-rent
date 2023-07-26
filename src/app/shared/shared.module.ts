import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  imports: [
    MaterialModule
  ],
  exports: [
    MaterialModule
  ],
  declarations: [
    PageNotFoundComponent
  ]
})

export class SharedModule {
}
