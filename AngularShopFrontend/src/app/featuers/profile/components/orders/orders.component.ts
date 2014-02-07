import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Order } from '../../models/order';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { CastEnumPipe } from '../../../../shared/pipes/cast-enum.pipe';
import { ShamsiPipe } from '../../../../shared/pipes/shamsi.pipe';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
  standalone: true,
  imports: [CommonModule, SharedModule,ShamsiPipe,CastEnumPipe],
})
export class OrdersComponent implements OnInit, OnDestroy {
  private sub$ = new Subscription();
  orders: Order[] = [];
  bsModalRef!: BsModalRef<any>;

  constructor(
    private profileService: ProfileService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getOrdersForCurrentUser();
  }
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  getOrdersForCurrentUser() {
    const sub$ = this.profileService.getOrdersForClient().subscribe((res) => {
      this.orders = res;
    });
    this.sub$.add(sub$);
  }

  showOrder(orderId: number) {
    const childOrder = this.orders.find((x) => x.id == orderId);
    const initial: ModalOptions = {
      class: 'modal-lg',
      initialState: {
        order: childOrder,
      },
    };
    this.bsModalRef = this.modalService.show(OrderDetailComponent, initial);
  }
}
