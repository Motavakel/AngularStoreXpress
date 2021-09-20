import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Pagination, Product } from '../models/product';
import { environment } from '../../../../environments/environment';
import { ShopParams } from '../models/shop-params';
import { Brand, Type } from '../models/brand';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl: string = environment.apiBaseUrl;
  private shopParams = new ShopParams();

  private priceRangeSubject = new BehaviorSubject<{
    minPrice?: number;
    maxPrice?: number;
  }>({});
  priceRange$ = this.priceRangeSubject.asObservable();

  private shopParamsSubject = new BehaviorSubject<ShopParams>(this.shopParams);
  shopParams$ = this.shopParamsSubject.asObservable();

  constructor(private request: HttpClient) {}

  getShopParams() {
    return this.shopParams;
  }

  updateShopParams(params: ShopParams) {
    this.shopParams = params;
    this.shopParamsSubject.next(this.shopParams);
  }

  getProducts(): Observable<Pagination<Product>> {
    let params = this.generateShopParams();
    return this.request.get<Pagination<Product>>(this.baseUrl + 'products', { params }).pipe(
      tap((res) => {
        const { minPrice, maxPrice } = res;
        if (minPrice != 0 && maxPrice != 0) {
          this.priceRangeSubject.next({ minPrice, maxPrice });
        }
      })
    );
  }

  private generateShopParams() {
    let params = new HttpParams();
    params = params.append('typeSort', this.shopParams?.typeSort);

    if (this.shopParams?.brandId && this.shopParams?.brandId > 0)
      params = params.append('brandId', this.shopParams?.brandId);
    if (this.shopParams?.typeId && this.shopParams?.typeId > 0)
      params = params.append('typeId', this.shopParams?.typeId);

    if (this.shopParams?.currentPrice && this.shopParams?.currentPrice >= 0)
      params = params.append('currentPrice', this.shopParams?.currentPrice);

    if (this.shopParams?.search)
      params = params.append('search', this.shopParams?.search);

    params = params.append('pageIndex', this.shopParams?.pageIndex);
    params = params.append('pageSize', this.shopParams?.pageSize);
    return params;
  }

  getTypes(includeAll = true) {
    return this.request.get<Type[]>(`${this.baseUrl}productType`).pipe(
      map((types) => {
        if (includeAll) types = [{ id: 0, title: 'همه' }, ...types];
        return types;
      })
    );
  }

  getBrands(includeAll = true) {
    return this.request.get<Brand[]>(`${this.baseUrl}ProductBrand`).pipe(
      map((brands) => {
        if (includeAll) brands = [{ id: 0, title: 'همه' }, ...brands];
        return brands;
      })
    );
  }
}

// #region Comment

/*
در اینجا ابتدا یک متغیر از نوع *شاپ پارامز* با مقدار اولیه تعریف شده است. این متغیر هنگام تغییر فیلترها در کامپوننت فیلتر فروشگاه
 از طریق متد *آپدیت شاپ پارامز* مقدار جدید دریافت می‌کند و مقدارش تغییر می‌یابد.

با هر تغییر در مقدار این متغیر، متغیر فقط خواندنی *شاپ دالر* آخرین مقدار را در خود نگه می‌دارد.
 از طرفی، چون در کامپوننت فروشگاه و در متد آن‌اینیت
 ، این مقدار مشترک اشتراک‌گذاری شده است، به محض تغییر مقدار آن، متد دریافت محصولات در همین کلاس اجرا می‌شود
 و باعث به‌روزرسانی داده‌ها و ارسال درخواست جدید به سرور می‌گردد.
*/

// #endregion
