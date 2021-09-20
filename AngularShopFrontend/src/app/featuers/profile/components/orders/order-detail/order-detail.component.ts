import { Component, OnInit } from '@angular/core';
import { Order } from '../../../models/order';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../../shared/shared.module';
import { CastEnumPipe } from '../../../../../shared/pipes/cast-enum.pipe';
import { ShamsiPipe } from '../../../../../shared/pipes/shamsi.pipe';


@Component({
  selector: 'app-order-detail',
  imports: [CommonModule, SharedModule,CastEnumPipe,ShamsiPipe],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css',
  standalone:true
})
export class OrderDetailComponent implements OnInit {

  order!: Order;
  constructor(
    public bsModalRef: BsModalRef,) {}

  ngOnInit(): void {
    console.log("Order:", this.order);
    console.log("Order Items:", this.order.orderItems);
  }



}
