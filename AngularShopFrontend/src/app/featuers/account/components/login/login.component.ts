import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from '../../helpers/validateform';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SharedModule]
})

export class LoginComponent implements OnInit{

  private returnUrl = '/profile';
  type:string = "password";
  isDisplay:boolean = false;
  eyeIcon:string = "fa-eye-slash";
  loginForm!:FormGroup;

  constructor(
    private toaster:ToastrService,
    private router: Router,
    private fb:FormBuilder,
    private accountService:AccountService,
    private title:Title
    ) {
      this.title.setTitle("ورود");
    }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      phoneNumber:["",Validators.required],
      password:["",Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.toaster.success("ورود با موفقیت انجام شد");
          this.router.navigate([this.returnUrl]);
        },
        error: (err) => {
          console.log("Error Response: ", err); // لاگ گرفتن برای بررسی دقیق‌تر
          const errorResponse = err?.error || {};
          if (errorResponse.messages) {
              errorResponse.messages.forEach( (m:string) => {
              this.toaster.error(m);
            });
          }
          else {
            this.toaster.error("خطایی رخ داده است، لطفا دوباره تلاش کنید.");
          }
        },
      });
    } else {
      ValidateForm.validateAllFormFileds(this.loginForm);
    }
  }

  onHideShowPass(){
    this.isDisplay = !this.isDisplay;
    this.type = this.isDisplay ? "text" : "password";
    this.eyeIcon = this.isDisplay ? "fa-eye" : "fa-eye-slash";
  }

  onForgetPassword(){
    this.router.navigate(["forgotpassword"]);
  }
}

