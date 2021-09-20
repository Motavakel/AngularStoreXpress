import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Pagination, Product } from '../../models/product';
import { Subscription } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ShopParams } from '../../models/shop-params';
import { PageChangedEvent, PaginationModule } from 'ngx-bootstrap/pagination';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { ShopFiltersComponent } from '../shop-filters/shop-filters.component';
import { ShopCardComponent } from '../../../../shared/components/shop-card/shop-card.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl:'./shop.component.css',
  standalone: true,
  imports: [
    CommonModule,
    ToastrModule,
    SharedModule,
    PaginationModule,
    ShopFiltersComponent,
    ShopCardComponent,
  ],
})
export class ShopComponent implements OnInit, OnDestroy {
  data!: Pagination<Product>;
  shopParams!: ShopParams;
  @ViewChild('search', { static: false }) searchTerm!: ElementRef;
  private sub$ = new Subscription();


  constructor(
    private shopService: ShopService,
    private toaster: ToastrService,
    private title: Title
  ) {
    this.title.setTitle('فروشگاه');
  }

  ngOnInit(): void {
    this.sub$.add(
      this.shopService.shopParams$.subscribe((params) => {
        this.shopParams = params;
        this.getProducts();
      })
    );
  }
  getProducts() {
    this.sub$.add(
      this.shopService.getProducts().subscribe({
        next: (res) => {
          this.data = res;
        },
        error: (err) => {
          const errorResponse = err?.error || {};
          if (errorResponse.messages) {
            errorResponse.messages.forEach((m: string) => {
              this.toaster.error(m);
            });
          } else {
            this.toaster.error('خطایی رخ داده است، لطفا دوباره تلاش کنید.');
          }
        },
      })
    );
  }
  onPageChange(event: PageChangedEvent) {
    this.shopParams.pageIndex = event.page;
    this.shopService.updateShopParams(this.shopParams);
    this.getProducts();
  }
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
  onSearch() {
    this.shopParams.search = this.searchTerm?.nativeElement?.value;
    this.shopService.updateShopParams(this.shopParams);
    this.getProducts();
    this.searchTerm.nativeElement.value = '';
  }
}
