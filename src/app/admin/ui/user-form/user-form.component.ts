import { Component, effect, inject, input, output } from '@angular/core';
import { User } from '../../../shared/interfaces/user';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlErrorComponent } from '../../../shared/ui/control-error/control-error.component';
import { RoleSelectComponent } from '../../../shared/ui/role-select/role-select.component';
import { Role } from '../../../tours/enums/role';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, ControlErrorComponent, RoleSelectComponent, NgClass],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  #formBuilder = inject(NonNullableFormBuilder);
  user = input.required<User>();
  roles = Object.values(Role);
  loading = input<boolean>();

  userForm = this.#formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    role: [Role.USER, Validators.required]
  });

  triggerSubmit = output<User>();

  constructor() {
    effect(() => {
      const user = this.user();

      if (user) {
        this.userForm.patchValue({
          email: user.email,
          name: user.name,
          role: user.role
        });
      }
    });
  }
  
  onSubmit() {
    if (this.userForm.valid) {
      let user = {
        ...this.user(),
        ...this.userForm.value
      }

      this.triggerSubmit.emit(user);
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  get role() {
    return this.userForm.controls.role;
  }
}
