import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BasketService } from '../../../featuers/basket/services/basket.service';
import { Product } from '../../../featuers/shop/models/product';
import { SharedModule } from '../../shared.module';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrl: './shop-card.component.css',
  standalone: true,
  imports: [CommonModule, SharedModule, PaginationModule],
})
export class ShopCardComponent {
  @Input() product!: Product;
  constructor(
    private basketService: BasketService,
    private toaster: ToastrService
  ) {}

  addItemToBasket() {
    console.log(this.product);
    this.basketService.addItemToBasket(this.product).subscribe({
      next: (res) => {
        this.toaster.success('محصول به سبد خرید اضافه شد');
      },
      error: (err) => {
        const errorResponse = err?.error || {};
        if (errorResponse.messages) {
          errorResponse.messages.forEach((m: string) => {
            this.toaster.error(m);
          });
        } else {
          this.toaster.error('خطایی رخ داده است، لطفا دوباره تلاش کنید.');
        }
      },
    });
  }
}
