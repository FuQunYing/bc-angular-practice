import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';

import {LoginComponent} from './login/login.component';
import {Page404Component} from './page404/page404.component';


@NgModule({
  imports: [SharedModule],
  exports: [],
  declarations: [LoginComponent, Page404Component],
  providers: [],
})
export class PagesModule {
}
