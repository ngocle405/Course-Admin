import { Component, OnInit,Injector } from '@angular/core';
import { HomeService } from '../services/home.service';
import * as _ from 'lodash';
import { BaseComponent } from '@shared/components';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  constructor(inject: Injector,private service:HomeService) {
    super(inject)
   }
  news:any=[];
  getNewRecord() {
    this.service.getNew().subscribe({
      next: (value) => {
        this.news = _.take(value, 3);
        this.loadingService?.complete();
      },
      error: (err) => {
        console.log(err);
        this.loadingService?.complete();
      },
    });
  }
  ngOnInit(): void {
    this.loadingService?.start();
    this.getNewRecord();
  }
  viewcourse() {
    

}
}
