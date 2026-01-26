import { inject } from "@angular/core";
import { AbstractControl, AsyncValidatorFn } from  "@angular/forms"
import { catchError, first, map, of, switchMap, tap, timer } from "rxjs";
import { UsersService } from "../../admin/data-access/users.service";

export const validateEmailValidator = (excludeId?: string): AsyncValidatorFn  => {
    const usersStore = inject(UsersService);

    return (control: AbstractControl) => {
        if (!control.value) return of(null);

        return timer(500).pipe(
          switchMap(() => usersStore.checkEmail(control.value, excludeId)),
          map(({ exists }) => (exists ? { emailTaken: true } : null)),
          first(),
          catchError(() => of(null))
        );
    };
}