import { LayoutComponent } from '../layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FinanceComponent } from './finance/finance.component';
import { LoginComponent } from './pages/login/login.component';
import { Page404Component } from './pages/page404/page404.component';
import { AuthGuardService } from '../service/auth-guard.service';


export const routes = [
      {path: '', component : LayoutComponent, children : [
            {path : '' , redirectTo : 'dashboard ' , pathMatch : 'full'},
            {path : 'dashboard' , component : DashboardComponent},
            {path : 'order' , loadChildren : './order/order.module#OrderModule'},
            {path : 'goods' , loadChildren : './goods/goods.module#GoodsModule' },
            {path : 'finance' , componet : FinanceComponent},
            {path : 'enter' , loadChildren : './enter/enter.module#EnterModule'},
            {path : 'account', loadChildren : './account/account.module#AccountModule' },
            {path : 'pages' , loadChildren : './pages/pages.module#PagesModule'}
      ],
      canActivate : [AuthGuardService]
    },
    // 单页面，不被layout包裹
    {path : '**' , redirectTo : 'login'},
    // {path : 'index.html:t:n' , component : LoginComponent}??
    {path : 'login' , component: LoginComponent} ,
    {path : '404' , component : Page404Component}
];

