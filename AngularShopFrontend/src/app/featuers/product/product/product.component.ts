import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shop/models/product';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { BasketService } from '../../basket/services/basket.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  standalone: true,
  imports: [CommonModule, SharedModule]
})
export class ProductComponent implements OnInit, OnDestroy {

  product!: Product;
  isAddingToBasket = false;
  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private basketService: BasketService,
    private routeId: ActivatedRoute,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.routeId.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const productId = Number(params.get('id'));
      if (productId) {
        this.getProduct(productId);
      }
    });
  }

  getProduct(productId: number) {
    this.productService.getProduct(productId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        this.product = res;
      },
      error: (err) => {
        const errorMessage = this.extractErrorMessage(err);
        this.toaster.error(errorMessage);
      }
    });
  }

  addItemToBasket() {
    if (!this.product || this.isAddingToBasket) return;

    this.isAddingToBasket = true;
    this.basketService.addItemToBasket(this.product).pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.toaster.success('محصول به سبد خرید اضافه شد');
        this.isAddingToBasket = false;
      },
      error: (err) => {
        const errorMessage = this.extractErrorMessage(err);
        this.toaster.error(errorMessage);
        this.isAddingToBasket = false;
      }
    });
  }

  // تابع کمکی برای استخراج پیام خطا
  private extractErrorMessage(err: any): string {
    const errorResponse = err?.error || {};
    if (Array.isArray(errorResponse.messages)) {
      return errorResponse.messages.join(' ');
    }
    return errorResponse.messages || "خطایی رخ داده است، لطفا دوباره تلاش کنید.";
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
