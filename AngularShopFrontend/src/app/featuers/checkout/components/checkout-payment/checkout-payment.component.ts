import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PortalTypeEnum } from '../../models/checkout';
import { OrderService } from '../../../profile/services/order.service';
import { CheckoutFormBuilderService } from '../../services/checkout-form-builder.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { take } from 'rxjs';
import { ShowEnumPipe } from '../../../../shared/pipes/show-enum.pipe';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.css',
  standalone: true,
  imports: [CommonModule, SharedModule,ShowEnumPipe],
})
export class CheckoutPaymentComponent implements OnInit {
  PortalType = PortalTypeEnum;
  portalSelected = 1;
  transferToPortal = false;
  constructor(
    private orderService: OrderService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: CheckoutFormBuilderService
  ) {}

  ngOnInit(): void {
    this.formBuilder.setPortalType(this.portalSelected);
  }

  onChangePortal(portalType: number) {
    this.portalSelected = portalType;
    this.formBuilder.setPortalType(portalType);
  }


  createOrder() {
    this.transferToPortal = true;

    this.orderService.createOrder().pipe(take(1)).subscribe({
      next: (res) => {
        if (res?.paymentUrl) {
          window.location.href = res.paymentUrl;
        } else {
          this.handlePaymentFailure();
        }
      },
      error: (err) => {
        console.error('خطا در ایجاد سفارش:', err);
        this.handlePaymentFailure();
      }
    });
  }

  private handlePaymentFailure() {
    this.transferToPortal = false;
    this.toastr.error('خطایی در ایجاد سفارش رخ داده است. لطفاً دوباره تلاش کنید.');
    this.router.navigateByUrl('/checkout/result?status=failed');
  }


}
