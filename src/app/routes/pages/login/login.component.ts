import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/service.module';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  t: string;
  n: string;
  validateForm: FormGroup;

  constructor(private authService: AuthService,
                      private fb: FormBuilder,
                      private router: Router) {
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
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ],
    });
  }
  login() {
    console.log(this.validateForm.value);
    // TODO:请求login接口
  }

}
