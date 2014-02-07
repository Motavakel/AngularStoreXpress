import { Component, OnInit } from '@angular/core';
import { ShopParams } from '../../models/shop-params';
import { ShopService } from '../../services/shop.service';
import { Brand, Type } from '../../models/brand';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-shop-filters',
  templateUrl: './shop-filters.component.html',
  styleUrl: './shop-filters.component.css',
  standalone: true,
  imports: [CommonModule, SharedModule, PaginationModule],
})
export class ShopFiltersComponent implements OnInit {
  public brands: Brand[] = [];
  public types: Type[] = [];

  public minPrice: number  = 0;
  public maxPrice: number  = 0;
  public selectedPrice: number  = 0;

  sortOptions = [
    { key: 1, title: 'جدیدترین ها' },
    { key: 2, title: 'گرانترین ها' },
    { key: 3, title: 'ارزان ترین ها' },
    { key: 4, title: 'براساس الفبا' },
  ];

  public shopParams!: ShopParams;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.shopParams = this.shopService.getShopParams();

    this.getBrands();
    this.getTypes();

    this.shopService.priceRange$.subscribe(({ minPrice, maxPrice }) => {
      this.minPrice = minPrice ?? 0;
      this.maxPrice = maxPrice ?? 0;
      this.selectedPrice = this.selectedPrice || this.maxPrice;
    });
  }

  private getTypes() {
    this.shopService.getTypes().subscribe((res) => {
      this.types = res;
    });
  }

  private getBrands() {
    this.shopService.getBrands().subscribe((res) => {
      this.brands = res;
    });
  }

  onChangeTypes(typeId: number) {
    this.shopParams.typeId = typeId;
    this.shopService.updateShopParams(this.shopParams);
  }

  onChangeBrands(brandId: number) {
    this.shopParams.brandId = brandId;
    this.shopService.updateShopParams(this.shopParams);
  }

  onChangeSort(sort: number) {
    this.shopParams.typeSort = sort;
    this.shopService.updateShopParams(this.shopParams);
  }

  onChangePrice(price: number) {
    this.shopParams.currentPrice = price;
    this.shopService.updateShopParams(this.shopParams);
  }
}
