import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';
import { StartDate } from '../interfaces/start-date';

@Pipe({
  name: 'availableDate',
  standalone: true
})
export class AvailableDatePipe implements PipeTransform {

  transform(dates: StartDate[]): string {
    const availableDates = dates.filter(d => dayjs(d.date).isAfter(dayjs()));
    
    return availableDates.length ? dayjs(availableDates[0].date).format('MMMM YYYY') : 'Unavailable';
  }

}
