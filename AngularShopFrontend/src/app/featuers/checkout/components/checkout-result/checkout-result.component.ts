import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderVerify, PaymentResult } from '../../models/checkout';
import { OrderService } from '../../../profile/services/order.service';
import { BasketService } from '../../../basket/services/basket.service';

@Component({
  selector: 'app-checkout-result',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './checkout-result.component.html',
  styleUrl: './checkout-result.component.css',
})
export class CheckoutResultComponent implements OnInit {

  //اطلاعات دریافتی از درگاه  برای ارسال به سرور
  paymentResult: PaymentResult = {
    authority: '',
    invoiceID: '',
    paymentStatus: '',
  };

  //اطلاعات دریافتی از سرور
  orderVerify:OrderVerify | null = null;
  isPaymentSuccess!:boolean;

  constructor(
    private router: ActivatedRoute,
    private orderService: OrderService,
    private basketService:BasketService
  ) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      this.paymentResult = {
        authority: params['Authority'] || '',
        invoiceID: params['InvoiceID'] || '',
        paymentStatus: params['PaymentStatus'] || '',
      };

      if (this.paymentResult.authority && this.paymentResult.invoiceID) {
        this.verifyPayment(this.paymentResult);
      }
    });
  }

  verifyPayment(paymentResult: PaymentResult): void {
    this.orderService.verifyPayment(paymentResult).subscribe({
      next: (res: OrderVerify) => {
        this.orderVerify = res;

        if(res.orderStatus == 2){
          this.isPaymentSuccess = true;
          this.basketService.clearLocalBasket();

        }else{
          this.isPaymentSuccess = false;
        }
      },
      error: (err: OrderVerify) => {
        console.error('Payment verification failed:', err);
      },
    });
  }
}


