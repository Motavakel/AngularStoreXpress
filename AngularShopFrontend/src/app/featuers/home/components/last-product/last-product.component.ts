import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Product } from '../../../shop/models/product';
import { ShopCardComponent } from '../../../../shared/components/shop-card/shop-card.component';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../services/home.service';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-last-product',
  standalone: true,
  imports: [CommonModule,SharedModule, ShopCardComponent],
  templateUrl: './last-product.component.html',
  styleUrl: './last-product.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LastProductComponent implements OnInit {
  data: Product[] = [];

  breakpoints = {
    640: { slidesPerView: 2, spaceBetween: 10 },
    768: { slidesPerView: 3, spaceBetween: 15 },
    1024: { slidesPerView: 4, spaceBetween: 20 }
  };

  constructor(private service: HomeService) {}

  ngOnInit(): void {
    this.service.getLastProducts().subscribe({
      next: (res) => {
        this.data = res;
      },
    });
  }
}
