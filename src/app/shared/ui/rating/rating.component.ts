import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-rating',
    imports: [NgClass, ReactiveFormsModule],
    templateUrl: './rating.component.html',
    styleUrl: './rating.component.scss'
})
export class RatingComponent {
  rating = input<number>();
  control = input<FormControl>();
}
