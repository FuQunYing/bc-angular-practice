import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isOpenOrder: Boolean = false;
  isOpenGoods: Boolean = false;
  isOpenEnter: Boolean = false;
  isOpenSetting: Boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  openChange(value) {
    if (value === 'Order') {
      this.isOpenGoods = false;
      this.isOpenEnter = false;
      this.isOpenSetting = false;
    } else if (value === 'Goods') {
      this.isOpenOrder = false;
      this.isOpenEnter = false;
      this.isOpenSetting = false;
    } else if (value === 'Enter') {
      this.isOpenOrder = false;
      this.isOpenGoods = false;
      this.isOpenSetting = false;
    } else if (value === 'Setting') {
      this.isOpenOrder = false;
      this.isOpenGoods = false;
      this.isOpenEnter = false;
    }
  }

}
