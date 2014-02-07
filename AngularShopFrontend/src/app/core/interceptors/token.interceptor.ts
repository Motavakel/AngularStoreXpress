import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, switchMap, take } from "rxjs";
import { AccountService } from "../../featuers/account/services/account.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private accountService:AccountService
  ){}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.accountService.currentUser$.pipe(
      take(1),
      switchMap(user => {
        if (user) {
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${user.token}` }
          });
        }
        return next.handle(request);
      })
    );
  }


}
