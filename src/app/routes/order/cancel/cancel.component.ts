import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../service/service.module';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit {
  orders: Array<any>= [];
  loading: Boolean = false;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getAllOrder([3])
          .then(res => {
            this.orders = res.json().result.result.detail;
            this.loading = res.json().result.result.count ? true : false;
          })
  }

}
