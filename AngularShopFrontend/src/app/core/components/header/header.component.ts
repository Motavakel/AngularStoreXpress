import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AccountService } from '../../../featuers/account/services/account.service';
import { BasketModel } from '../../../featuers/basket/models/basket';
import { BasketService } from '../../../featuers/basket/services/basket.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, SharedModule]
})
export class HeaderComponent implements OnInit {

  currentRoute: string = '';
  isAuthentication$: Observable<boolean>;
  basket$: Observable<BasketModel | null> | undefined;
  mobileNavOpen: boolean = false;

  @ViewChild('mobileNav') mobileNav!: ElementRef;

  constructor(
    private router: Router,
    private basketService: BasketService,
    private accountService: AccountService,
    private renderer: Renderer2
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });

    const basketId = localStorage.getItem(environment.BasketKey);
    if (basketId) {
      this.basket$ = this.basketService.basketItems$;

      if (!this.basketService.getCurrentBasketSource()) {
        this.basketService.getBasket(basketId).subscribe();
      }
    }

    this.isAuthentication$ = this.accountService.currentUser$.pipe(
      map(user => !!user)
    );
  }

  ngOnInit(): void {}

  toggleMobileNav() {
    if (!this.mobileNav) return;

    if (this.mobileNavOpen) {
      this.renderer.removeClass(this.mobileNav.nativeElement, 'open');
      this.renderer.addClass(this.mobileNav.nativeElement, 'close');

      setTimeout(() => {
        this.renderer.setStyle(this.mobileNav.nativeElement, 'display', 'none');
      }, 300);
    } else {
      this.renderer.setStyle(this.mobileNav.nativeElement, 'display', 'block');
      this.renderer.removeClass(this.mobileNav.nativeElement, 'close');
      this.renderer.addClass(this.mobileNav.nativeElement, 'open');
    }

    this.mobileNavOpen = !this.mobileNavOpen;
  }
}
