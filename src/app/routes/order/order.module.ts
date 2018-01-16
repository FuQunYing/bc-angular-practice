import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { NewComponent } from './new/new.component';
import { HistoryComponent } from './history/history.component';
import { RefunComponent } from './refun/refun.component';
import { TodoComponent } from './todo/todo.component';
import { UrgeComponent } from './urge/urge.component';
import { CancelComponent } from './cancel/cancel.component';

const routes: Routes = [
      {path: '' , redirectTo : 'new'},
      {path: 'new' , component : NewComponent},
      {path: 'todo' , component : TodoComponent},
      {path: 'cancel', component : CancelComponent},
      {path : 'urge', component : UrgeComponent},
      {path: 'refun' , component : RefunComponent},
      {path : 'history' , component : HistoryComponent}
];

@NgModule({
      imports: [
            SharedModule,
            RouterModule.forChild(routes)
      ],
      exports: [RouterModule],
      declarations: [
            NewComponent,
            TodoComponent,
            CancelComponent,
            UrgeComponent,
            RefunComponent,
            HistoryComponent
      ],
      providers: [],
})
export class OrderModule { }
