import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../account/services/account.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class ProfileComponent implements OnInit {
  public title: string = '';

  constructor(
    public accountService: AccountService,
    private route: ActivatedRoute
  ) {}

  public links = [
    {
      name: 'اطلاعات شخصی',
      href: 'information',
      icon: 'fa-solid fa-circle-info',
      attachFiles: false,
    },
    {
      name: 'سفارش‌های من',
      href: 'orders',
      icon: 'fas fa-table-list',
      attachFiles: true,
    },
    {
      name: 'کالاهای مورد علاقه',
      href: 'favorites',
      icon: 'fa-solid fa-thumbs-up',
      attachFiles: false,
    },
    {
      name: 'آدرس',
      href: 'addresses',
      icon: 'fa-solid fa-location-dot',
      attachFiles: false,
    },
    {
      name: 'نظرات',
      href: 'comments',
      icon: 'fa-solid fa-comment',
      attachFiles: false,
    },
    {
      name: 'پیام‌ها',
      href: 'notifications',
      icon: 'fa-solid fa-bell',
      attachFiles: false,
    },
    {
      name: 'تغییر کلمه عبور',
      href: 'changePassword',
      icon: 'fas fa-lock',
      attachFiles: false,
    },
  ];

  ngOnInit(): void {
    this.title = this.route?.snapshot?.firstChild?.data['title'] as string;
  }

  logout() {
    this.accountService.logout();
  }
}
