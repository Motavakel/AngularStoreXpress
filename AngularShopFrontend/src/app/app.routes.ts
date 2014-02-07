import { Routes } from '@angular/router';
import { LoginComponent } from './featuers/account/components/login/login.component';
import { RegisterComponent } from './featuers/account/components/register/register.component';
import { BasketComponent } from './featuers/basket/components/basket/basket.component';
import { CheckoutComponent } from './featuers/checkout/checkout.component';
import { ProductComponent } from './featuers/product/product/product.component';
import { ChangePasswordComponent } from './featuers/profile/components/change-password/change-password.component';
import { NotificationsComponent } from './featuers/profile/components/notifications/notifications.component';
import { OrdersComponent } from './featuers/profile/components/orders/orders.component';
import { ProfileComponent } from './featuers/profile/profile.component';
import { ShopComponent } from './featuers/shop/components/shop/shop.component';
import { CheckoutResultComponent } from './featuers/checkout/components/checkout-result/checkout-result.component';
import { authGuard } from './core/guards/auth.guard';
import { AddAddressComponent } from './shared/components/add-address/add-address.component';
import { AddressComponent } from './featuers/profile/components/address/address.component';
import { HomeComponent } from './featuers/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'checkout/result', component: CheckoutResultComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'product/:id', component: ProductComponent },
  { path: 'addaddress', component: AddAddressComponent },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full' },
      { path: 'orders', component: OrdersComponent },
      { path: 'addresses', component: AddressComponent },
      { path: 'changePassword', component: ChangePasswordComponent },
      { path: 'notifications', component: NotificationsComponent },
    ],
  },
];
