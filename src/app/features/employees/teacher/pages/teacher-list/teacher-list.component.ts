import { Component, Injector, OnInit } from '@angular/core';
import { BaseTableComponent } from '@shared/components';
import { TeacherActionComponent } from '../../components';
import { TeacherModel } from '../../models/teacher.model';
import { TeacherService } from '../../services/teacher.service';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent extends BaseTableComponent<TeacherModel> implements OnInit {

  constructor(inject:Injector,service:TeacherService) {
    super(inject,service);
  }
  override params: TeacherModel = {
    searchCode: '',
    searchName: '',
    status: ''
  }
override initConfigAction(): void {
  this.configAction={
    title:"Giáo viên",
    component:TeacherActionComponent
  }
};
  ngOnInit(): void {
  }
  onReset(){
    this. params = {
      searchCode: '',
      searchName: '',
      status: ''
    };
    this.search();
  }

}
