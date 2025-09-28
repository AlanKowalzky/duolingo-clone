import { Directive, ElementRef, input, effect } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  readonly color = input<string>('#58cc02');
  readonly isActive = input<boolean>(false);

  constructor(private el: ElementRef) {
    effect(() => {
      if (this.isActive()) {
        this.el.nativeElement.style.backgroundColor = this.color();
        this.el.nativeElement.style.transition = 'background-color 0.3s';
      } else {
        this.el.nativeElement.style.backgroundColor = '';
      }
    });
  }
}