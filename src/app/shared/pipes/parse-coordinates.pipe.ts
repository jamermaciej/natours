import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseCoordinates',
  standalone: true
})
export class ParseCoordinatesPipe implements PipeTransform {

  transform(coordinates: number[]): google.maps.LatLngLiteral | google.maps.LatLng {
    return {
      lat: coordinates[1],
      lng: coordinates[0]
    };
  }

}
