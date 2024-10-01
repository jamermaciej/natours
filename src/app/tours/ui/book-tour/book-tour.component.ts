import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Tour } from '../../interfaces/tour';
import { DatePipe, NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-book-tour',
  standalone: true,
  imports: [MatSelectModule, FormsModule, NgFor, NgClass, DatePipe],
  templateUrl: './book-tour.component.html',
  styleUrl: './book-tour.component.scss'
})
export class BookTourComponent {
  tour = input.required<Tour>();
  selectedDate = model.required<Date>();

  isPrev(date: Date): boolean {
    const currentDate = new Date().getTime();
    return currentDate > new Date(date).getTime();
  }
}
