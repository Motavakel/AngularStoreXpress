import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeroComponent } from './components/hero/hero.component';
import { LastProductComponent } from './components/last-product/last-product.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone:true,
  imports: [CommonModule,HeroComponent,LastProductComponent,BrandListComponent]
})
export class HomeComponent {

  constructor(
    private title:Title
  ){
    this.title.setTitle("صفحه اصلی");
  }
}
