import { Component, input, model } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-role-select',
    imports: [FormsModule, ReactiveFormsModule],
    templateUrl: './role-select.component.html',
    styleUrl: './role-select.component.scss'
})
export class RoleSelectComponent {
  selectedOption = model<string>('');
  options = input.required<string[]>();
  control = input<FormControl>();

  onSelectionChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedOption.set(value);
  }
}
