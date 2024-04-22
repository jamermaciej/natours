import { Component, EventEmitter, OnInit, Output, inject, input, model } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { ControlErrorComponent } from '../../../shared/ui/control-error/control-error.component';
import { User } from '../../../shared/interfaces/user';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../../../shared/ui/file-upload/file-upload.component';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ControlErrorComponent, FileUploadComponent, NgClass],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent implements OnInit {
  #formBuilder = inject(NonNullableFormBuilder);
  errorMessage = input<string>();
  profileForm = this.#formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    photo: ['']
  });
  user = input.required<User>();
  loading = model.required<boolean>();
  readonly apiHostUrl = environment.apiHostUrl;
  @Output() onUpdateProfile: EventEmitter<User> = new EventEmitter<User>();

  ngOnInit(): void {
      const { name, email } = this.user();
      this.profileForm.patchValue({ name, email });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.loading.set(true);
      this.onUpdateProfile.emit({
        ...this.user(),
        ...this.profileForm.value
      });
      
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  get name() {
    return this.profileForm.controls.name;
  }

  get email() {
    return this.profileForm.controls.email;
  }
}
