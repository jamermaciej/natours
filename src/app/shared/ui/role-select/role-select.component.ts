import { Component, input, model, output, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  onSelectionChange(value: string) {
    this.selectedOption.set(value);
  }
}
