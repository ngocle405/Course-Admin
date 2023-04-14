import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: '[uppercase]'
  })
  export class ToUpperCaseDirective {
  
    constructor() {}
  
    @HostListener('input', ['$event']) onKeyUp(event:any) {
      event.target['value'] = event.target['value'].toUpperCase();
    }
  
  }