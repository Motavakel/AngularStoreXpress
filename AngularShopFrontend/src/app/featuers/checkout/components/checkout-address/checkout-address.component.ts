import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AccountService } from '../../../account/services/account.service';
import { Address } from '../../../profile/models/address';
import { CheckoutFormBuilderService } from '../../services/checkout-form-builder.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { AddAddressComponent } from '../../../../shared/components/add-address/add-address.component';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.css',
  standalone: true,
  imports: [CommonModule, SharedModule],
})
export class CheckoutAddressComponent implements OnInit, OnDestroy {
  @Output() addressComplete = new EventEmitter<boolean>();
  sub$ = new Subscription();
  public addresses: Address[] = [];
  public indexAddressShipping = 0;

  constructor(
    private accountService: AccountService,
    private formBuilder: CheckoutFormBuilderService,
    private bsModalRef: BsModalRef,
    private modalService: BsModalService
  ) {}

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
  ngOnInit(): void {
    this.getAddresses();
    this.formBuilder.formBuilder$.subscribe((res) => {
      // console.log(res);
    });
  }
  private getAddresses() {
    const sub = this.accountService
      .getAddresses()
      .subscribe((res: Address[]) => {
        this.addresses = res;
        this.indexAddressShipping = res.findIndex((x) => x.isMain);
        if (this.indexAddressShipping !== -1) {
          this.addressComplete.emit(true);
          this.onChangeAddressShipping(this.indexAddressShipping);
        }
      });

    this.sub$.add(sub);
  }

  setToMainAddress(index: number) {}

  AddNewAddress() {
    const initialState: ModalOptions = {
      initialState: {},
    };
    this.bsModalRef = this.modalService.show(AddAddressComponent, initialState);
    this.bsModalRef.content.newAddress.subscribe((address: any) => {
      this.checkAddressMain(address);
      this.addresses.push(address);
      this.onChangeAddressShipping(this.addresses.length - 1);
    });
  }

  onChangeAddressShipping(index: number) {
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
