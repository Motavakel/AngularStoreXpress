import { PortalTypeEnum } from "../../checkout/models/checkout";
import { ShipToAddress } from "./address";


export interface Order {
  id: number;
  paymentDate: string;
  invoiceNumber: string;
  buyerPhoneNumber: string;
  subTotal: number;
  isFinally: boolean;
  transactionId: number;
  trackingCode: string;
  authority: string;
  portalType: number | string | PortalTypeEnum;
  orderStatus: number | string | OrderStatusEnum;
  deliveryMethod: DeliveryMethod;
  shipToAddress: ShipToAddress;
  orderItems: OrderItem[];
}

export interface DeliveryMethod {
  id: number;
  isDelete: boolean;
  shortName: string;
  deliveryTime: string;
  description: string;
  price: number;
}

export interface OrderRequest {
  basketId?: string;
  deliveryMethodId?: number;
  buyerPhoneNumber?: string;
  portalType?: number;
  shipToAddress?: ShipToAddress;
}

export enum OrderStatusEnum {
  درحال_بررسی = 1,
  درحال_پردازش,
  تحویل_اداره_پست,
  ارسال_شده,
  تحویل_داده_شده,
  بازگشت_داده_شده,
  انصراف_داده_شده,
  ناموفق
}

export interface OrderItem {
  id: number;
  price: number;
  quantity: number;
  itemOrdered: ItemOrdered;
}

export interface ItemOrdered {
  productItemId: number;
  productName: string;
  productTypeName: string;
  productBrandName: string;
  pictureUrl: string;
}
