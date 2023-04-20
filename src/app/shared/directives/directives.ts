import { Directive, HostListener,Input ,ElementRef,Renderer2} from "@angular/core";

@Directive({
    selector: '[uppercase]'
  })
  export class ToUpperCaseDirective {
  
    constructor() {}
  
    @HostListener('input', ['$event']) onKeyUp(event:any) {
      event.target['value'] = event.target['value'].toUpperCase();
    }
  
  }
  @Directive({
    selector: '[fxDebounceClick]'
  })
  export class DebounceClickDirective {
    @Input('fxDebounceClick') debounceTime = 500;
    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
    @HostListener('click', ['$event'])
    clickEvent(): void{
      this.renderer.addClass(this.elementRef.nativeElement, 'disable-click');
      setTimeout(() => {
        this.renderer.removeClass(this.elementRef.nativeElement, 'disable-click');
      }, this.debounceTime);
    }
  }