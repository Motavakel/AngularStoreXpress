import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, take } from 'rxjs';
import { AccountService } from '../../featuers/account/services/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const router = inject(Router);
  const toaster = inject(ToastrService);

  return accountService.currentUser$.pipe(
    take(1),
    map(user => {
      if (!user || !user.token) {
        toaster.error("لطفا ابتدا لاگین کنید");
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};
