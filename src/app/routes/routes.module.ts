import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared,module';
import { PagesModule } from '../routes/pages/pages.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FinanceComponent } from './finance/finance.component';



@NgModule({
      imports: [SharedModule],
      exports: [RouterModule],
      declarations: [DashboardComponent, FinanceComponent],
      providers: [],
})
export class RoutesModule { }
