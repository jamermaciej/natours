import { Component, EventEmitter, Output, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { CommonModule } from '@angular/common';
import { ControlErrorComponent } from '../../../shared/ui/control-error/control-error.component';
import { Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { authActions } from '../../../shared/data-access/auth/store/auth.actions';


@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent, CommonModule, ControlErrorComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
  #formBuilder = inject(FormBuilder);
  errorMessage = input<string>();
  changePasswordForm = this.#formBuilder.group({
    passwordCurrent: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(8)]]
  });
  #actions = inject(Actions).pipe(
    ofType(authActions.updatePasswordSuccess),
    map(() => {
      this.changePasswordForm.reset();
      this.changePasswordForm.updateValueAndValidity();
    })
  ).subscribe();

  @Output() onChangePassword: EventEmitter<any> = new EventEmitter<any>();

  onSubmit() {
    if (this.changePasswordForm.valid) {
      this.onChangePassword.emit(this.changePasswordForm.value);
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
