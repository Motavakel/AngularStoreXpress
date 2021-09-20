import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BasketService } from '../../basket/services/basket.service';
import { CheckoutFormBuilderService } from '../../checkout/services/checkout-form-builder.service';
import { DeliveryMethod } from '../models/order';
import { Injectable } from '@angular/core';
import { OrderVerify, PaymentResult } from '../../checkout/models/checkout';
import { Observable, combineLatest } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = environment.apiBaseUrl;

  constructor(
    private request: HttpClient,
    private basketService: BasketService,
    private formBuilder: CheckoutFormBuilderService
  ) {}

  getDeliveryMethods(): Observable<DeliveryMethod[]> {
    return this.request.get<DeliveryMethod[]>(`${this.baseUrl}order/getDeliveryMethods`).pipe(
      catchError((error) => {
        console.error('خطا در دریافت روش‌های ارسال:', error);
        throw error;
      })
    );
  }
  createOrder(): Observable<{ paymentUrl: string }> {
    return combineLatest([this.basketService.basketItems$, this.formBuilder.formBuilder$]).pipe(
      map(([basket, form]) => {
        const order = {
          basketId: basket?.id,
          buyerPhoneNumber: form?.address?.number,
          deliveryMethodId: form?.deliveryMethod?.id,
          shipToAddress: form?.address,
          portalType: form?.portalType ?? 1,
        };

        //console.log("سفارش در حال ارسال به سرور:", order);

        return order;
      }),
      switchMap((order) =>
        this.request.post<{ paymentUrl: string }>(`${this.baseUrl}order/createOrder`, order).pipe(
          catchError((error) => {
            console.error("خطا در ایجاد سفارش:", error);
            throw error;
          })
        )
      )
    );
  }



  verifyPayment(paymentResult: PaymentResult): Observable<OrderVerify> {
    return this.request.post<OrderVerify>(`${this.baseUrl}Order/Verify`, paymentResult).pipe(
      catchError((error) => {
        console.error('خطا در تأیید پرداخت:', error);
        throw error;
      })
    );
  }
}
