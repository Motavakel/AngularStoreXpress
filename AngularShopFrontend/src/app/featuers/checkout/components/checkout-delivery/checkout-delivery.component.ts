import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { BasketService } from '../../../basket/services/basket.service';
import { DeliveryMethod } from '../../../profile/models/order';
import { OrderService } from '../../../profile/services/order.service';
import { CheckoutFormBuilderService } from '../../services/checkout-form-builder.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.css',
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class CheckoutDeliveryComponent implements OnInit {

  @Output() deliveryComplete = new EventEmitter<boolean>();

  deliveryMethods: DeliveryMethod[] = [];
  indexSelected = 0;

  constructor(
    private orderService: OrderService,
    private formBuilder: CheckoutFormBuilderService,
    private basketService: BasketService
  ) {}

  ngOnInit(): void {
    this.getDeliveryMethods();
  }
  onChangeDelivery(index: number) {
    this.indexSelected = index;
    this.setDeliveryMethod(index);

    if (this.deliveryMethods[index]) {
      this.basketService.setShippingPrice(this.deliveryMethods[index].price);
    }
    this.formBuilder.formBuilder$.subscribe((res) => {
      console.log(res);
    });
  }

    private setDeliveryMethod(index: number) {
      const selectedMethod = this.deliveryMethods[index];
      if (!selectedMethod) {
        console.warn("روش ارسال انتخاب‌شده یافت نشد!");
        return;
      }

      console.log("روش انتخاب‌شده:", JSON.stringify(selectedMethod));
      console.log("ID روش ارسال:", selectedMethod.id);

      // حالا این مقدار را به فرم ارسال کنید
      this.formBuilder.setDeliveryMethod(selectedMethod);
    }


  private getDeliveryMethods() {
    this.orderService.getDeliveryMethods().subscribe((res) => {
      if (res && res.length > 0) {
        this.deliveryMethods = res;

        console.log("روش‌های دریافت‌شده:", this.deliveryMethods);

        this.basketService.setShippingPrice(this.deliveryMethods[0].price);
        this.setDeliveryMethod(this.indexSelected);
        this.deliveryComplete.emit(true);
      } else {
        console.warn("هیچ روش ارسالی دریافت نشد!");
      }
    });
  }


}




// #region comment
/*
      console.log('true' + JSON.stringify(this.deliveryMethods[index]));

با استفاده از این کامپوننت ابتدا روشهای ارسال رو دریافت می کنیم
و بعد با استفاده از ایندکس گزینه انتخاب شده
، روش انتخابی کاربر برای ارسال رو به دیتابیس می فرستیم
*/
// #endregion
