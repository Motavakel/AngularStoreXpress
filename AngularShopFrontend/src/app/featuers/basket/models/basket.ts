import { v4 as uuidv4 } from 'uuid';

export interface BasketModel {
  id: string;
  items: BasketItems[];
}

export interface BasketItems {
  id: number;
  isDelete?: boolean;
  productTitle: string;
  type: string;
  brand: string;
  quantity: number;
  price: number;
  discount: number;
  pictureUrl: string;
}

export interface BasketTotal {
  shipping: number;
  subTotal: number;
  total: number;
}

export class Basket implements BasketModel {
  id:string = uuidv4();
  items: BasketItems[] = [];
}
