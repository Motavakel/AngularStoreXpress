import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validateform';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule,SharedModule]
})
export class RegisterComponent implements OnInit{

  registerForm!:FormGroup;
  type:string = "password";
  isDisplay:boolean = false;
  eyeIcon:string = "fa-eye-slash";

  constructor(
    private fb:FormBuilder,
    private toaster:ToastrService,
    private accountService:AccountService,
    private router:Router,
    private title:Title
  ){
    this.title.setTitle("ثبت نام");
  }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      displayName:["",Validators.required],
      phoneNumber:["",Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required],
    },
    { validators: ValidateForm.passwordMatchValidator }
  )
  }

  onHideShowPass(){
    this.isDisplay = !this.isDisplay;
    this.type = this.isDisplay ? "text" : "password";
    this.eyeIcon = this.isDisplay ? "fa-eye" : "fa-eye-slash";
  }

  onForgetPassword(){
    /* this.router.navigate(["forgotpassword"]); */
  }

  onRegister(){
       if (this.registerForm.valid) {
          this.accountService.register(this.registerForm.value).subscribe({
            next: (res) => {
              this.toaster.success("ورود با موفقیت انجام شد");
              this.router.navigate(['login']);
            },
            error: (err) => {

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
          ValidateForm.validateAllFormFileds(this.registerForm);
        }
  }

}
