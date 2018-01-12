import { NgModule } from '@angular/core';
import { OrderService } from './order.service';
import { GoodsService } from './goods.service';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { PersonService } from './person.service';
import { CookiesService } from './cookies.service';

export {
      CookiesService,
      AuthService,
      AuthGuardService,
      OrderService,
      GoodsService,
      PersonService
};

@NgModule()
export class ServicesModule {
      static forRoot() {
            return {
                  ngModule: ServicesModule,
                  providers: [
                        CookiesService,
                        AuthGuardService,
                        AuthService,
                        OrderService,
                        GoodsService,
                        PersonService
                  ]
            };
      }
 }
