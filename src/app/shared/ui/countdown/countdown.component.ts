import { Component, computed, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { interval, map } from 'rxjs';
dayjs.extend(duration);

@Component({
  selector: 'app-countdown',
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent {
  readonly targetDate = input.required<Date>();

  private readonly now = toSignal(interval(1000).pipe(map(() => new Date())), {
    initialValue: new Date(),
  });

  private readonly duration = computed(() =>
    dayjs.duration(Math.max(0, dayjs(this.targetDate()).diff(dayjs(this.now())))),
  );

  readonly days = computed(() => String(Math.floor(this.duration().asDays())).padStart(2, '0'));
  readonly hours = computed(() => String(this.duration().hours()).padStart(2, '0'));
  readonly minutes = computed(() => String(this.duration().minutes()).padStart(2, '0'));
  readonly seconds = computed(() => String(this.duration().seconds()).padStart(2, '0'));
}
