import { Directive, ElementRef, input, effect, inject } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
  standalone: true
})
export class AutoFocusDirective {
  private readonly el = inject(ElementRef);
  
  readonly enabled = input<boolean>(true, { alias: 'appAutoFocus' });
  readonly delay = input<number>(0);
  
  constructor() {
    effect(() => {
      if (this.enabled()) {
        const delayMs = this.delay();
        
        if (delayMs > 0) {
          setTimeout(() => this.focus(), delayMs);
        } else {
          // Use requestAnimationFrame to ensure DOM is ready
          requestAnimationFrame(() => this.focus());
        }
      }
    });
  }
  
  private focus(): void {
    const element = this.el.nativeElement;
    
    if (element && typeof element.focus === 'function') {
      element.focus();
      
      // For input elements, also select text if present
      if (element.tagName === 'INPUT' && element.type === 'text') {
        element.select();
      }
    }
  }
}