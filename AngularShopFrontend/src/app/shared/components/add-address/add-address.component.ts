import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../featuers/account/services/account.service';
import { Address } from '../../../featuers/profile/models/address';

@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.css',
})
export class AddAddressComponent {
  @Output() newAddress = new EventEmitter<Address>();
  title: string = 'ثبت آدرس جدید';
  closeBtnName: string = 'بستن';

  constructor(
    public bsModalRef: BsModalRef,
    private accountService: AccountService,
    private toast: ToastrService
  ) {}

  form = new FormGroup({
    number: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    isMain: new FormControl<boolean>(true),
    state: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    city: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    firstName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    fullAddress: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    postalCode: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }
    this.accountService.addAddress(this.form.value).subscribe((newAddress) => {
      this.newAddress.emit(newAddress);
      this.toast.success('آدرس با موفقیت اضافه گردید');
      this.bsModalRef.hide();
    });
  }
}
