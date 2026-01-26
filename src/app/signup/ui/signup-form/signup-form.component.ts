import { Component, EventEmitter, Output, inject, input } from '@angular/core';
import { AbstractControlOptions, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';


import { ControlErrorComponent } from '../../../shared/ui/control-error/control-error.component';
import { matchPasswordValidator } from '../../../shared/validators/match-password-validator';

@Component({
    selector: 'app-signup-form',
    imports: [ReactiveFormsModule, ControlErrorComponent],
    templateUrl: './signup-form.component.html',
    styleUrl: './signup-form.component.scss'
})
export class SignupFormComponent {
  #formBuilder = inject(FormBuilder);
  isLoading = input<boolean>();
  errorMessage = input<string>();
  signupForm = this.#formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordConfirm: ['', [Validators.required, Validators.minLength(8)]]
  }, {
    validator: matchPasswordValidator
  } as  AbstractControlOptions);
  @Output() onSignup: EventEmitter<any> = new EventEmitter<any>();

  onSubmit() {
    if (this.signupForm.valid) {
      this.onSignup.emit(this.signupForm.value);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  get name() {
    return this.signupForm.controls.name;
  }

  get email() {
    return this.signupForm.controls.email;
  }

  get password() {
    return this.signupForm.controls.password;
  }

  get passwordConfirm() {
    return this.signupForm.controls.passwordConfirm;
  }
}
