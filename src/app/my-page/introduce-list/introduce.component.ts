import { Component, Injector, OnInit } from '@angular/core';
import { CommonCategoryService } from '@cores/services/common-category.service';
import { BaseComponent } from '@shared/components';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: ['./introduce.component.scss'],
})
export class IntroduceComponent extends BaseComponent implements OnInit {
  constructor(inject:Injector,private service:HomeService) {
    super(inject);
  }
   
  news: any;
  teachers :any;
  getNewRecord() {
    this.service.getNew().subscribe((data) => {
      this.news = data;
    });
  }
  getTeacherRecord() {
    this.service.getTeacher().subscribe((data) => {
      this.teachers = data;
    });
  }
  ngOnInit(): void {
    this.getNewRecord();
    this.getTeacherRecord();
  }
}
