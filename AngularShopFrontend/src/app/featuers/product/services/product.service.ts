import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../shop/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl :string = environment.apiBaseUrl;

  constructor(private request:HttpClient) { }

  getProduct(id:number):Observable<Product>{
    return this.request.get<Product>(`${this.apiUrl}Products/${id}`)
  }
}
