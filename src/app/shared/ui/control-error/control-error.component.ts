import { Component, DestroyRef, InjectionToken, OnInit, effect, inject, input, signal } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { distinctUntilChanged, merge, take, } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const defaultErrors: {
  [key: string]: any;
} = {
  required: () => `This field is required`,
  minlength: ({ requiredLength, actualLength }: any) => `Password must be at least ${requiredLength} characters long.`,
  email: () => 'Email is invalid'
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors,
});

@Component({
  selector: 'app-control-error',
  standalone: true,
  imports: [],
  templateUrl: './control-error.component.html',
  styleUrl: './control-error.component.scss'
})
export class ControlErrorComponent implements OnInit {
  #formGroupDirective = inject(FormGroupDirective);
  #errors = inject(FORM_ERRORS);
  #destroyRef = inject(DestroyRef);
  message = signal<string>('');  
  controlName = input.required<string>();
  customErrors = input< { [key: string]: string } >();

  constructor() {
    effect(() => {
        console.log(`The count is: ${this.controlName()})`);
    });
  }

  ngOnInit(): void {
      if (this.#formGroupDirective) {
        const control = this.#formGroupDirective.control.get(this.controlName());

        if (control) {
          merge(control.valueChanges, this.#formGroupDirective.ngSubmit).pipe(
            distinctUntilChanged(),
            take(1),
            takeUntilDestroyed(this.#destroyRef)
          ).subscribe(() => {
            console.log(control.errors)
            const controlErrors = control.errors;

            if (controlErrors) {
              const firstKey = Object.keys(controlErrors)[0];
              const getError = this.#errors[firstKey];
              const text = this.customErrors()?.[firstKey] || getError(controlErrors[firstKey]);

              this.setError(text);
            } else {
              this.setError('');
            }
          });
        } else {
          console.error('ErrorComponent must be used within a FormGroupDirective.');
        }
      }
  }

  setError(text: string) {
    this.message.set(text);
  }
}