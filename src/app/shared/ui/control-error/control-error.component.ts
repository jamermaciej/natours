import { Component, DestroyRef, InjectionToken, OnInit, inject, input, signal } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { delay, distinctUntilChanged, merge, take, } from 'rxjs';
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
    imports: [],
    templateUrl: './control-error.component.html',
    styleUrl: './control-error.component.scss'
})
export class ControlErrorComponent implements OnInit {
  #formGroupDirective = inject(FormGroupDirective);
  #errors = inject(FORM_ERRORS);
  #destroyRef = inject(DestroyRef);
  errorMessage = signal<string>('');  
  controlName = input.required<string>();
  customErrors = input< { [key: string]: string | ((error: any) => string) } >();
  pendingMessage = signal<string>('');
  pendingText = input<string>('Validating...');

  ngOnInit(): void {
      if (this.#formGroupDirective) {
        const control = this.#formGroupDirective.control.get(this.controlName());

        if (control) {
          merge(control.statusChanges, control.valueChanges, this.#formGroupDirective.ngSubmit).pipe(
            distinctUntilChanged(),
            takeUntilDestroyed(this.#destroyRef)
          ).subscribe(() => {
            if (control.status === 'PENDING') {
              this.setPendingMessage(this.pendingText());
              this.setErrorMessage('');
              return;
            }

            this.setPendingMessage('');
            
            const controlErrors = control.errors;

            if (controlErrors && control.dirty) {
              const firstKey = Object.keys(controlErrors)[0];
              const getError = this.customErrors()?.[firstKey] || this.#errors[firstKey];
              const text = typeof getError === 'function' 
                ? getError(controlErrors[firstKey]) 
                : getError;
                
              this.setErrorMessage(text);
            } else {
              this.setErrorMessage('');
            }
          });
        } else {
          console.error('ErrorComponent must be used within a FormGroupDirective.');
        }
      }
  }

  setErrorMessage(text: string) {
    this.errorMessage.set(text);
  }

  setPendingMessage(text: string) {
    this.pendingMessage.set(text);
  }
}