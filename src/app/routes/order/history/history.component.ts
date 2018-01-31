import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../../service/service.module';
import {NzModalService} from 'ng-zorro-antd';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  orders: Array<any> = [];
  loading: Boolean = false;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.getAllOrder([4])
      .then(res => {
        this.orders = res.json().result.result.detail;
        this.loading = res.json().result.result.count ? true : false;
      });
  }

}
