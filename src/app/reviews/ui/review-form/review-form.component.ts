import { Component, computed, effect, inject, input, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlErrorComponent } from '../../../shared/ui/control-error/control-error.component';
import { ReviewBody, ReviewResponse } from '../../../tours/interfaces/review';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { NgClass } from '@angular/common';
import { RatingComponent } from '../../../shared/ui/rating/rating.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [ReactiveFormsModule, ControlErrorComponent, LoaderComponent, NgClass, RatingComponent, RouterLink],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.scss'
})
export class ReviewFormComponent {
  #formBuilder = inject(NonNullableFormBuilder);
  review = input.required<ReviewResponse>();

  userId = input.required<string>();
  tourId = input.required<string>();

  isLoading = input<boolean>();
  reviewForm = this.#formBuilder.group({
    review: ['', Validators.required],
    rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]]
  });
  triggerSubmit = output<ReviewBody>();
  tourName = computed(() => (
    this.review()?.tour.name
  ));
  loading: boolean | undefined;

  constructor() {
    effect(() => {
      const review = this.review();

      if (review) {
        this.reviewForm.patchValue({
          review: review.review,
          rating: review.rating
        });
      }
    });
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      let review = {
        ...this.reviewForm.getRawValue(),
        tour: this.tourId() ?? this.review().tour._id,
        user: this.userId() ?? this.review().user._id,
        id: this.review()?.id ?? undefined
      }

      this.triggerSubmit.emit(review);
      this.loading = true;
    } else {
      this.reviewForm.markAllAsTouched();
    }
  }

  get rating() {
    return this.reviewForm.controls.rating;
  }
}
