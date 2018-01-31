import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../service/service.module';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CookiesService} from '../../../service/cookies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  t: string;
  n: string;
  validateForm: FormGroup;
  alert: Boolean = false;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private _cookie: CookiesService) {
    if (localStorage.getItem(`isLoggedIn`)) {
      console.log('已经登录，跳转到dashbored');
      this.router.navigate(['/dashbord']);
    }
    console.log('登录，并初始化');
    this.t = localStorage.getItem(`t`);
    this.n = localStorage.getItem(`n`);
    this.authService.login(this.t, this.n);
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  login() {
    console.log(this.validateForm.value);
    this.authService.userlogin(this.validateForm.value.userName, this.validateForm.value.password)
      .then(res => {
        if (res.json().rcode === 0) {
          this.router.navigateByUrl('/dashboard');
          // console.log(res.json());
          localStorage.setItem(`t`, res.json().result.token);
          localStorage.setItem(`n`, res.json().result.webSecret);
          this._cookie.setCookie('login', 'true', 60); // 路由守卫中认为cookie中有login才算登录，所以remember就没用了
        } else {
          this.alert = true;
        }
      }).catch(res => {
      this.alert = true;
      console.log(new Error('用户名或密码错误'));
    });
  }

}
