import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Login, Register } from '../models/login';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Address, ShipToAddress } from '../../profile/models/address';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  apiUrl:string = environment.apiBaseUrl;

  private currentUser = new BehaviorSubject< User | null >(null);
  public currentUser$ = this.currentUser.asObservable();

  constructor(
    private request:HttpClient,
    private router:Router,
  ) {
  const userJson = localStorage.getItem(environment.keyAuthToken);
  if (userJson) {
    const user: User = JSON.parse(userJson);
    this.currentUser.next(user);
  }
}


  login(login: Login): Observable<User | null> {
    return this.request.post<User>(`${this.apiUrl}account/login`, login).pipe(
      map((response : User)=> {
        if (response) {
          this.setCurrentUser(response);
          return response;
        }
        return  null;
      })
    );
  }

  register(register: Register): Observable<User | null> {
    return this.request.post<User>(`${this.apiUrl}account/register`, register).pipe(
      map((response: User) => {
        if (response) {
          this.setCurrentUser(response);
          return response;
        }
        return null;
      })
    );
  }

  logout() {
    localStorage.removeItem(environment.keyAuthToken);
    this.currentUser.next(null);
    this.router.navigateByUrl('/');
  }

  setCurrentUser(user: User) {
    if (user) {
      localStorage.setItem(environment.keyAuthToken, JSON.stringify(user));
      this.currentUser.next(user);
    }
  }


  getAddresses() {
    return this.request.get<Address[]>(`${this.apiUrl}account/getAddresses`);
  }
  addAddress(address: ShipToAddress | any) {
    return this.request.post<Address>(`${this.apiUrl}account/createAddress`, address);
  }

}
