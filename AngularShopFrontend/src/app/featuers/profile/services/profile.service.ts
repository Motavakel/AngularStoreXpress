import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = environment.apiBaseUrl;

  constructor(
    private request:HttpClient
  ) { }

  public getOrdersForClient():Observable<Order[]>{
    return this.request.get<Order[]>(`${this.apiUrl}order/getOrdersForUser`);
  }

}
