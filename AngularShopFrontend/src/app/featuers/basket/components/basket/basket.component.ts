import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketItems, BasketModel } from '../../models/basket';
import { BasketService } from '../../services/basket.service';
import { Title } from '@angular/platform-browser';
import { environment } from '../../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { BasketSummaryComponent } from '../basket-summary/basket-summary.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  standalone:true,
  imports: [CommonModule, SharedModule,BasketSummaryComponent]
})
export class BasketComponent implements OnInit {

  basket$: Observable<BasketModel | null> | undefined;

  constructor(
    private basketService: BasketService,
    private title: Title
  ) {
    this.title.setTitle('سبدخرید');
  }

  ngOnInit(): void {
    const basketId = localStorage.getItem(environment.BasketKey);
    if (basketId) {
      this.basket$ = this.basketService.basketItems$;

      if (!this.basketService.getCurrentBasketSource()) {
        this.basketService.getBasket(basketId).subscribe();
      }
    }
  }

  increaseItemQuantity(item: BasketItems) {
    this.basketService.increaseItemQuantity(item.id).subscribe();
  }

  decreaseItemQuantity(item: BasketItems) {
    this.basketService.decreaseItemQuantity(item.id).subscribe();
  }

  removeItemFromBasket(item: BasketItems) {
    this.basketService.deleteItemFromBasket(item.id).subscribe();
  }
}
