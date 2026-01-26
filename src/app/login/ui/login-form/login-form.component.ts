import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { CommonModule } from '@angular/common';
import { ControlErrorComponent } from '../../../shared/ui/control-error/control-error.component';

@Component({
    selector: 'app-login-form',
    imports: [ReactiveFormsModule, LoaderComponent, CommonModule, ControlErrorComponent],
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  #formBuilder = inject(FormBuilder);
  isLoading = input<boolean>();
  errorMessage = input<string>();
  loginForm = this.#formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  @Output() onLogin: EventEmitter<any> = new EventEmitter<any>();

  onSubmit() {
    if (this.loginForm.valid) {
      this.onLogin.emit(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }
}
