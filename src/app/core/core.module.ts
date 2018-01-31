import {NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpModule} from '@angular/http';
import {ServicesModule} from '../service/service.module';

@NgModule({
  imports: [
    HttpModule,
    ServicesModule.forRoot()
  ],
  exports: [],
  declarations: [],
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: {uri: '/api'}
    }
  ],
})
export class CoreModule {
  t: string;
  n: string;

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule 已经装载，请仅在AppModule中引入该模块');
    }
    // 保存从地址栏拿到的t和n
    this.t = this.GetQueryString(`t`);
    this.n = this.GetQueryString(`n`);
    if (this.t !== null && this.n !== null) {
      if (this.t !== localStorage.getItem(`t`) || this.n !== localStorage.getItem(`n`)) {
        localStorage.setItem(`t`, this.t);
        localStorage.setItem(`n`, this.n);
      }
    }
  }

  /**
   * 获取URL参数
   * @param name
   * @param {any}
   * @constructor
   */
  GetQueryString(name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    } else {
      return null;
    }
  }
}
