import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseTableComponent } from '@shared/components';
import { CourseActionComponent } from '../../components';
import { CourseModel, StateCourse } from '../../models/course.model';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent extends BaseTableComponent<CourseModel> implements OnInit {

  constructor(inject:Injector,service:CourseService) {
    super(inject,service);
  }
  override stateData: StateCourse|undefined;
  override params: CourseModel = {
    searchName:'',
    status:'',
    searchCode:'',
    courseCategoryId:'',
    teacherId:''
  }
  override mapState():void{
    this.stateData?.listTeacher.unshift({ teacherName: 'Tất cả', teacherId: '' });
    this.stateData?.listCourseCategory.unshift({ courseCategoryName: 'Tất cả', courseCategoryId: '' });
  }
  ngOnInit(): void {
   if(!this.stateData){
    this.stateData = {
      listCourseCategory:[],
      listStatus: [],
      listTeacher:[]
    };
   }
  }
  override initConfigAction(): void {
    this.configAction={
      title:"Khoá học",
      component:CourseActionComponent
    }
  };
  onReset(){
    this.params = {
      searchName:'',
      status:'',
      searchCode:'',
      courseCategoryId:'',
      teacherId:''
    }
    this.search();
  }

}
