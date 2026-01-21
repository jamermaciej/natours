import { Component, input, model, output, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-role-select',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './role-select.component.html',
  styleUrl: './role-select.component.scss'
})
export class RoleSelectComponent {
  selectedOption = model<string>('');
  options = input.required<string[]>();
  control = input<FormControl>();

  onSelectionChange(value: string) {
    this.selectedOption.set(value);
  }
}
