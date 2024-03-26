import { AbstractControl, ValidationErrors, ValidatorFn } from  "@angular/forms"

export  const  matchPasswordValidator: ValidatorFn = (control: AbstractControl):  ValidationErrors | null  => {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');

  if (passwordConfirm?.errors && !passwordConfirm.errors['passwordMismatch']) return null;

  return password && passwordConfirm && password.value != passwordConfirm.value ? { passwordMismatch: true } : null;
}