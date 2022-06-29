import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseTableComponent } from '@shared/components';
import { StudentActionComponent } from '../../components';
import { StudentModel } from '../../models/student.model';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent extends BaseTableComponent<StudentModel> implements OnInit {

  constructor(inject: Injector, service: StudentService) {
    super(inject, service);
  }
  override params: StudentModel = {
    studentName: '',
    studentCode: '',
    status: '',
    gender: '',
    courseId: '',
    searchName: '',
    searchCode: '',
    classId:''
  }
  ngOnInit(): void {
    if (!this.stateData) {
      this.stateData = {
        listCourse: [],
        listStatus: [],

      };
    }


  }
  onReset() {
    this.params = {
      studentName: '',
      studentCode: '',
      status: '',
      gender: '',
      courseId: '',
      searchName: '',
      searchCode: '',
      classId:''
    }
    this.search();
  }
  override mapState(): void {
    this.stateData?.listCourse.unshift({ courseName: 'Tất cả', courseId: '' });
    this.stateData?.listClass.unshift({ className: 'Tất cả', classId: '' });
  }
  override initConfigAction(): void {
    this.configAction = {
      title: "Học viên",
      component: StudentActionComponent
    }
  };

}
