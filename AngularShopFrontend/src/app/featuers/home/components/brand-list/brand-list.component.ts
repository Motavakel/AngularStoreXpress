import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ShopService } from '../../../shop/services/shop.service';
import { Brand } from '../../../shop/models/brand';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-brand-list',
  imports: [CommonModule,SharedModule],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BrandListComponent implements OnInit{

  data:Brand[] = [];
  breakpoints = {
    640: { slidesPerView: 2, spaceBetween: 10 },
    768: { slidesPerView: 3, spaceBetween: 15 },
  };
  constructor(private service:ShopService){}

  ngOnInit(): void {
    this.service.getBrands(false).subscribe({
      next:(res) =>{
        if(res){
          this.data = res;
        }else{
          "برندی هنوز اضافه نکرده اید"
        }
      }
    });
  }

}
