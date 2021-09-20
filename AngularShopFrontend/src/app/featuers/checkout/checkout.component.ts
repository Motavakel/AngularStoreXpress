import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CheckoutAddressComponent } from './components/checkout-address/checkout-address.component';
import { CheckoutPaymentComponent } from './components/checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from './components/checkout-review/checkout-review.component';
import { CheckoutDeliveryComponent } from './components/checkout-delivery/checkout-delivery.component';
import { BasketSummaryComponent } from '../basket/components/basket-summary/basket-summary.component';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    CheckoutAddressComponent,
    CheckoutPaymentComponent,
    CheckoutReviewComponent,
    CheckoutDeliveryComponent,
    BasketSummaryComponent
  ],
})
export class CheckoutComponent {

  @ViewChild(MatStepper) stepper!: MatStepper;
  
  isAddressCompleted = false;
  isDeliveryCompleted = false;

  constructor() {}

  onAddressComplete(isCompleted: boolean) {
    this.isAddressCompleted = isCompleted;
    if (isCompleted) {
      this.stepper.next();
    }
  }

  onDeliveryComplete(isCompleted: boolean) {
    this.isDeliveryCompleted = isCompleted;
    if (isCompleted) {
      this.stepper.next();
    }
  }

}
