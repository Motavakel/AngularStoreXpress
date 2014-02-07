import { Address } from "../../profile/models/address";
import { DeliveryMethod } from "../../profile/models/order";

export enum PortalTypeEnum {
  نوینو = 1
}


export interface CheckoutFormBuilder {
  deliveryMethod?: DeliveryMethod;
  address?: Address;
  portalType?: number;
}

export interface PaymentResult{
  authority:string,
  paymentStatus:string,
  invoiceID:string
}

export interface OrderVerify {
  invoiceNumber?:string,
  trackingCode?:string,
  orderStatus:number
}
