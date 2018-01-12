import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared,module';
import { NewEnterComponent } from './new-enter/new-enter.component';
import { AdminEnterComponent } from './admin-enter/admin-enter.component';

const routes: Routes = [
      {path : 'new' , component : NewEnterComponent},
      {path : 'admin', component : AdminEnterComponent}
];

@NgModule({
      imports: [
            SharedModule,
            RouterModule.forChild(routes)
      ],
      exports: [RouterModule],
      declarations: [
            AdminEnterComponent,
            NewEnterComponent
      ],
      providers: [],
})
export class EnterModule { }
