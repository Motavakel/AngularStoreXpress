import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, ViewEncapsulation } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { HeroSliderModel } from '../../models/hero-slider-model';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, SharedModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  encapsulation: ViewEncapsulation.None
})
export class HeroComponent implements OnInit {
  private brandId: number = 1;
  public heroSlider: HeroSliderModel[] = [];



  constructor(private service: HomeService) {}

  ngOnInit(): void {
    this.service.getHeroSliderData(this.brandId).subscribe({
      next: (data) => {
        this.heroSlider = data;
      },
      error: (error) => {
        console.error('خطایی رخ داده است', error);
      },
    });
  }
}
