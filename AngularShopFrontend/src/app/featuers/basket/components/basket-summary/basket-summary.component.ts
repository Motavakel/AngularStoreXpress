import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketTotal } from '../../models/basket';
import { BasketService } from '../../services/basket.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  standalone:true,
  imports: [CommonModule, SharedModule]
})
export class BasketSummaryComponent implements OnInit {

  basketTotal$!: Observable<BasketTotal | null>;
  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    this.basketTotal$ = this.basketService.totalBasket$;
  }
}
