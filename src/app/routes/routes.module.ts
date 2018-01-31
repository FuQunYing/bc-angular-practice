import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

import {PagesModule} from '../routes/pages/pages.module';
import {routes} from './routes';
import {DashboardComponent} from './dashboard/dashboard.component';
import {FinanceComponent} from './finance/finance.component';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(routes, {useHash: true}),
    PagesModule
  ],
  exports: [RouterModule],
  declarations: [DashboardComponent, FinanceComponent],
  providers: [],
})
export class RoutesModule {
}
