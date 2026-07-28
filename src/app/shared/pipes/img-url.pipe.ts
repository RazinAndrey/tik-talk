import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environment';

@Pipe({
  name: 'imgUrl',
  standalone: true,
})
export class ImgUrlPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) {
      return '';
    }
    return `${environment.apiUrl}/${value}`;
  }
}
