import { Component, EventEmitter, Output, inject, input, model } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ControlErrorComponent } from '../../../shared/ui/control-error/control-error.component';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { authActions } from '../../../shared/data-access/auth/store/auth.actions';
import { PasswordUpdateData } from '../../../shared/interfaces/password-update-data';


@Component({
    selector: 'app-change-password',
    imports: [ReactiveFormsModule, CommonModule, ControlErrorComponent],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  #formBuilder = inject(NonNullableFormBuilder);
  errorMessage = input<string>();
  changePasswordForm = this.#formBuilder.group({
    passwordCurrent: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(8)]]
  });
  // REFACTOR THIS
  #actions = inject(Actions).pipe(
    ofType(authActions.updatePasswordSuccess),
    map(() => {
      this.changePasswordForm.reset();
      this.changePasswordForm.updateValueAndValidity();
    })
  ).subscribe();

  loading = model.required<boolean>();

  @Output() onChangePassword: EventEmitter<PasswordUpdateData> = new EventEmitter<PasswordUpdateData>();

  onSubmit() {
    if (this.changePasswordForm.valid) {
      this.loading.set(true);
      this.onChangePassword.emit(this.changePasswordForm.getRawValue());
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }

  get passwordCurrent() {
    return this.changePasswordForm.controls.passwordCurrent;
  }

  get password() {
    return this.changePasswordForm.controls.password;
  }

  get passwordConfirm() {
    return this.changePasswordForm.controls.passwordConfirm;
  }
}
