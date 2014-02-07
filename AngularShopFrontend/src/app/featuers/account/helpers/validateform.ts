import { AbstractControl, FormControl, FormGroup } from "@angular/forms";



export default class ValidateForm{

  static validateAllFormFileds(formGroup: FormGroup) {

    //برای هر ورودی که دارای نام است
    Object.keys(formGroup.controls).forEach(field => {

        //دریافت مقدار فیلد یا  کنترل با استفاده نام فیلد
        const control = formGroup.get(field);

        //در صورتی که از جنس کنترل باشد ،درتی میشه
        if (control instanceof FormControl) {
            control.markAsDirty({ onlySelf: true });
        }

        //در صورتی که فرم تو درتوی دیگری باشد دوباره متد براش اجرا میشه
        else if (control instanceof FormGroup) {
            this.validateAllFormFileds(control);
        }
    });
  }

  static passwordMatchValidator(controls: AbstractControl): { [key: string]: boolean } | null {
    const password = controls.get('password')?.value;
    const confirmPassword = controls.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

}
