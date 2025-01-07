import {Directive, ElementRef, HostListener} from '@angular/core';


@Directive({
  selector: '[appOnlyNumbers]'
})
export class OnlyNumbersDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: InputEvent) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const filteredValue = inputElement.value.replace(/[^0-9]/g, '');
    if (inputElement.value !== filteredValue) {
      inputElement.value = filteredValue;
      event.stopImmediatePropagation(); // Prevent invalid characters from being processed
    }
  }
}
