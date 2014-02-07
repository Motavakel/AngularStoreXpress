import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Address } from '../../profile/models/address';
import { DeliveryMethod } from '../../profile/models/order';
import { CheckoutFormBuilder } from '../models/checkout';

@Injectable({
  providedIn: 'root'
})
export class CheckoutFormBuilderService {
  private formBuilder = new BehaviorSubject<CheckoutFormBuilder | null>(null);
  public formBuilder$ = this.formBuilder.asObservable();

  constructor() {}

  setAddress(address: Address) {
    this.formBuilder.next({ ...this.formBuilder.value, address });
    //console.log(JSON.stringify(this.formBuilder.value))

  }
  setDeliveryMethod(deliveryMethod: DeliveryMethod) {
    const updatedValue = { ...this.formBuilder.value, deliveryMethod };
    //console.log(JSON.stringify(this.formBuilder.value))
    this.formBuilder.next(updatedValue);
  }

  setPortalType(portalType: number) {
    this.formBuilder.next({ ...this.formBuilder.value, portalType });
  }
}
