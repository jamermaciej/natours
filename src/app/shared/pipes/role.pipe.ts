import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../../tours/enums/role';

@Pipe({
  name: 'role',
  standalone: true
})
export class RolePipe implements PipeTransform {

  transform(role: string): string {
    if (role === Role.LEAD_GUIDE) {
      return 'Lead guide';
    } else if (role === Role.GUIDE) {
      return 'Tour guide';
    } else {
      return role;
    }
  }

}
