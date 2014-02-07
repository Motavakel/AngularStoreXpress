import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from '../../../basket/services/basket.service';
import { Basket } from '../../../basket/models/basket';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.css',
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class CheckoutReviewComponent implements OnInit {

  basket$!: Observable<Basket | null>;
  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this.basketService.basketItems$;
  }
}
