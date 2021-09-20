import { Injectable } from '@angular/core';
import {Basket, BasketItems, BasketModel,BasketTotal,} from '../models/basket';
import { Product } from '../../shop/models/product';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BasketService {


  private apiUrl = environment.apiBaseUrl;
  private shippingPrice = 0;

  private basketItems = new BehaviorSubject<BasketModel | null>(null);
  basketItems$ = this.basketItems.asObservable();

  private totalBasket = new BehaviorSubject<BasketTotal | null>(null);
  totalBasket$ = this.totalBasket.asObservable();

  constructor(private request: HttpClient) {
    if (environment.BasketKey) {
      const basketFromLocalStorage = localStorage.getItem(environment.BasketKey);
      if (basketFromLocalStorage) {
        this.getBasket(basketFromLocalStorage);
      }
    }
  }

  getCurrentBasketSource() {
    return this.basketItems.getValue();
  }

  getBasket(id: string): Observable<BasketModel> {
    return this.request.get<BasketModel>(`${this.apiUrl}basket/${id}`).pipe(
      tap((basket) => {
        this.basketItems.next(basket);
        this.calculateTotal();
      })
    );
  }

  setBasket(basket: BasketModel): Observable<BasketModel> {
    if (JSON.stringify(this.basketItems.getValue()) === JSON.stringify(basket)) {
      return of(basket);
    }

    return this.request.post<BasketModel>(`${this.apiUrl}basket`, basket).pipe(
      tap((updatedBasket) => {
        console.log('Basket updated:', updatedBasket);
        this.basketItems.next(updatedBasket);
        this.calculateTotal();
      })
    );
  }

  addItemToBasket(product: Product, quantity = 1) {
    const basket = this.getCurrentBasketSource() ?? this.createBasket();
    const itemToAdd: BasketItems = this.mapProductToBasketItem(product, quantity);
    basket.items = this.addOrUpdateBasketItems(itemToAdd, basket.items, quantity);
    return this.setBasket(basket);
  }

  private mapProductToBasketItem(
    product: Product,quantity: number): BasketItems
   {
    return {
      id: product.id,
      brand: product.productBrand,
      discount: 0,
      pictureUrl: product.pictureUrl,
      price: product.price,
      productTitle: product.title,
      quantity: quantity,
      type: product.productType,
    };
  }
  private createBasket() {
    const basket = new Basket();
    localStorage.setItem(environment.BasketKey, basket.id);
    return basket;
  }
  private addOrUpdateBasketItems(
    itemToAdd: BasketItems,
    items: BasketItems[],
    quantity: number
  ): BasketItems[] {
    const index = items.findIndex((x) => x.id === itemToAdd.id);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  clearLocalBasket() {
    this.basketItems.next(null);
    this.totalBasket.next(null);
    localStorage.removeItem(environment.BasketKey);
  }

  setShippingPrice(shippingPrice: number) {
    this.shippingPrice = shippingPrice;
    this.calculateTotal();
  }

  private calculateTotal(): void {
    const basket = this.getCurrentBasketSource();
    const items = basket?.items ?? [];

    const subTotal = items.reduce((init, item) => item.price * item.quantity + init, 0);
    const total = subTotal + this.shippingPrice;

    this.totalBasket.next({
      shipping: this.shippingPrice,
      subTotal: subTotal,
      total: total,
    });
  }

  increaseItemQuantity(id: number): Observable<BasketModel | null> {
    const basket = this.getCurrentBasketSource();
    if (!basket || !basket.items) return of(null);

    const item = basket.items.find((x) => x.id === id);
    if (item) {
      item.quantity += 1;
      return this.setBasket(basket);
    }

    return of(null);
  }

  decreaseItemQuantity(id: number): Observable<BasketModel | null> {
    const basket = this.getCurrentBasketSource();
    if (!basket || !basket.items) return of(null);

    const itemIndex = basket.items.findIndex((x) => x.id === id);
    if (itemIndex !== -1) {
      if (basket.items[itemIndex].quantity > 1) {
        basket.items[itemIndex].quantity--;
        return this.setBasket(basket);
      } else {
        return this.deleteItemFromBasket(id);
      }
    }

    return of(null);
  }

  deleteItemFromBasket(id: number): Observable<BasketModel | null> {
    const basket = this.getCurrentBasketSource();
    if (!basket || !basket.items) return of(null);

    basket.items = basket.items.filter(item => item.id !== id);

    if (basket.items.length === 0) {
      this.clearLocalBasket();
      return of(null);
    }
    return this.setBasket(basket);
  }

  deleteBasket(id: string) {
    //TODO
  }
}
