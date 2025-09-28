import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'score',
  standalone: true
})
export class ScorePipe implements PipeTransform {
  transform(value: number): string {
    if (value >= 90) return `🏆 ${value}%`;
    if (value >= 70) return `⭐ ${value}%`;
    if (value >= 50) return `👍 ${value}%`;
    return `📚 ${value}%`;
  }
}