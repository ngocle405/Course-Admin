import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sub-dashboard',
  templateUrl: './sub-dashboard.component.html',
  styleUrls: ['./sub-dashboard.component.scss']
})
export class SubDashboardComponent implements OnInit,OnChanges {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() inputValue: string='';
  @Output() dataOut = new EventEmitter<any>();
  validationError: string='';

  ngOnChanges() {
    this.validateInput();
  }
  progress1:number=1;
  onInputChange() {
    this.validateInput();
  }
  get progress(): number {
    return this.progress1;
  }
  set progress(value: number) {
    if (typeof value !== 'number') {
      const progress = Number(value);
      if (Number.isNaN(progress)) {
        this.progress1 = 0;
        console.log('test');
        
      } else {
        this.progress1 = progress;
        console.log('done');
        
      }
    } else {
      this.progress = value;
    }
  }
  checkDashboard(event:any){
    console.log(event);
    
    this.dataOut.emit(event);
  }
  validateInput() {
   console.log( this.inputValue);
   
    // Example validation: Check if the input value is empty
    if (!this.inputValue || this.inputValue.trim() === '') {
      this.validationError = 'Input value is required!';
    } else {
      this.validationError = ''; // Clear validation error if input is valid
    }
  }
}
