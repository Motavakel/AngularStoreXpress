import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HeroSliderModel } from '../models/hero-slider-model';
import { environment } from '../../../../environments/environment';
import { Product } from '../../shop/models/product';
import { Brand } from '../../shop/models/brand';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private request: HttpClient) {}

  getHeroSliderData(id: number): Observable<HeroSliderModel[]> {
    return this.request
      .get<HeroSliderModel[]>(this.apiUrl + 'Products/brand/' + id)
      .pipe(map((items) => items.slice(0, 5)));
  }

  getLastProducts(): Observable<Product[]> {
    return this.request
      .get<Product[]>(this.apiUrl + 'Products/last')
      .pipe(map((items) => items.slice(0, 6)));
  }


}
