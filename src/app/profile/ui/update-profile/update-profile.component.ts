import { Component, EventEmitter, OnInit, Output, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { CommonModule } from '@angular/common';
import { ControlErrorComponent } from '../../../shared/ui/control-error/control-error.component';
import { User } from '../../../shared/interfaces/user';
import { environment } from '../../../../environments/environment';
import { FileUploadComponent } from '../../../shared/ui/file-upload/file-upload.component';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent, CommonModule, ControlErrorComponent, FileUploadComponent],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent implements OnInit {
  #formBuilder = inject(FormBuilder);
  errorMessage = input<string>();
  profileForm = this.#formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    photo: [null]
  });
  user = input.required<User>();
  readonly apiHostUrl = environment.apiHostUrl;
  @Output() onUpdateProfile: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
      const { name, email } = this.user();
      this.profileForm.patchValue({ name, email });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.onUpdateProfile.emit(this.profileForm.value);
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
