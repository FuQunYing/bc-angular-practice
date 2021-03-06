import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FileUploadModule} from 'ng2-file-upload';

import {SharedModule} from '../../shared/shared.module';

import {LibsComponent} from './libs/libs.component';
import {SellComponent} from './sell/sell.component';
import {NewTemplateComponent} from './sell/new-template.component';

const routes: Routes = [
  {path: 'libs', component: LibsComponent},
  {path: 'sell', component: SellComponent}
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    FileUploadModule
  ],
  exports: [RouterModule],
  declarations: [
    LibsComponent,
    SellComponent,
    NewTemplateComponent
  ],
  entryComponents: [NewTemplateComponent],
  providers: [],
})
export class GoodsModule {
}
