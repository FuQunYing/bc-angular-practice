import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router,  CanActivate, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { CookiesService } from './cookies.service';

@Injectable()
export class AuthGuardService implements CanActivate {
      constructor(private authService: AuthService,
                        private router: Router,
                        private _cookie: CookiesService
                  ) { }

      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            const url: string = state.url;
            return this.checkAuth(url);
      }

      checkAuth(url) {
            if (this._cookie.getCookie('login') === 'true') {
                  console.log('登录成功');
                  return true;
            }
            this.router.navigate(['login']);
            return false;
      }
}
