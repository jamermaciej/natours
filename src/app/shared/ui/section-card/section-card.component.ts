import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-card',
  imports: [],
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.scss',
})
export class SectionCardComponent {
  title = input<string>();
  variant = input<'default' | 'cancelled' | 'refunded'>('default');
}
