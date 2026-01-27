import { Component, effect, EnvironmentInjector, inject, input, output, runInInjectionContext } from '@angular/core';
import { User, UserBody } from '../../../shared/interfaces/user';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlErrorComponent } from '../../../shared/ui/control-error/control-error.component';
import { RoleSelectComponent } from '../../../shared/ui/role-select/role-select.component';
import { Role } from '../../../tours/enums/role';

import { validateEmailValidator } from '../../../shared/validators/validate-email.validator';
import { RouterLink } from "@angular/router";
import { FlowRoutes } from '../../../shared/enums/flow-routes';

@Component({
    selector: 'app-user-form',
    imports: [ReactiveFormsModule, ControlErrorComponent, RoleSelectComponent, RouterLink],
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  #formBuilder = inject(NonNullableFormBuilder);
  user = input<User>();
  roles = Object.values(Role);
  loading = input<boolean>();
  btnText = input.required<string>();

  userForm = this.#formBuilder.group({
    name: ['', Validators.required],
    email: ['', {
      validators: [Validators.email, Validators.required],
      asyncValidators: [validateEmailValidator()],
      updateOn: 'blur'
    }],
    role: [Role.USER, Validators.required]
  });

  triggerSubmit = output<UserBody>();
  #injector = inject(EnvironmentInjector);
  flowRoutes = FlowRoutes;
  
  constructor() {
    effect(() => {
      const user = this.user();

      if (user?._id && this.email) {     
        runInInjectionContext(this.#injector, () => {
          this.email.setAsyncValidators([
            validateEmailValidator(user._id)
          ]);
        });

        this.userForm.patchValue(user);
        this.userForm.markAsPristine();
        this.userForm.markAsUntouched();
        this.email.updateValueAndValidity({ emitEvent: false });
      }
    });
  }
  
  onSubmit() {
    if (this.userForm.valid) {
      const formValues = this.userForm.getRawValue();
      this.triggerSubmit.emit(formValues);
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  get role() {
    return this.userForm.controls.role;
  }

  get email() {
    return this.userForm.controls.email;
  }
}
