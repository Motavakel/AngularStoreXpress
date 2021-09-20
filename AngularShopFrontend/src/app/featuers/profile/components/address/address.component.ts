import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subject, Subscription } from 'rxjs';
import { AccountService } from '../../../account/services/account.service';
import { CheckoutFormBuilderService } from '../../../checkout/services/checkout-form-builder.service';
import { Address } from '../../models/address';
import { AddAddressComponent } from '../../../../shared/components/add-address/add-address.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address',
  imports: [CommonModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css',
})
export class AddressComponent implements OnInit, OnDestroy {
  sub$ = new Subscription();
  public addresses: Address[] = [];
  public indexAddressShipping = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private formBuilder: CheckoutFormBuilderService,
    private bsModalRef: BsModalRef,
    private modalService: BsModalService
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.getAddresses();
    this.formBuilder.formBuilder$.subscribe((res) => {});
  }
  private getAddresses() {
    const sub = this.accountService
      .getAddresses()
      .subscribe((res: Address[]) => {
        this.addresses = res;
        this.indexAddressShipping = res.findIndex((x) => x.isMain);
        this.onChangeAddressShipping(this.indexAddressShipping);
      });
    this.sub$.add(sub);
  }

  setToMainAddress(index: number) {}
  AddNewAddress() {
    console.log('bsModalRef:', this.bsModalRef);

    const initialState: ModalOptions = {
      initialState: {},
    };

    this.bsModalRef = this.modalService.show(AddAddressComponent, initialState);
    this.bsModalRef.content.newAddress.subscribe((address: any) => {
      this.checkAddressMain(address);
      this.addresses.push(address);
      this.onChangeAddressShipping(this.addresses.length - 1); //last item
    });
  }
  onChangeAddressShipping(index: number) {
    // product => address
    const address = this.addresses[index];
    this.indexAddressShipping = index;
    this.formBuilder.setAddress(address);
  }

  private checkAddressMain(address: Address) {
    if (address.isMain) {
      this.addresses.forEach((element) => {
        if (element.id === address.id) {
          element.isMain = true;
        } else {
          element.isMain = false;
        }
      });
    }
  }
}
