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

  constructor(inject:Injector, service:StudentService) {
    super(inject,service);
  }
  override params: StudentModel ={
    studentName: '',
    studentCode: '',
    status: '',
    gender: '',
    courseId:'',
  }
  ngOnInit(): void {
    if(!this.stateData){
      this.stateData = {
        listCourse:[],
        listStatus: [],
       
      };
    }
     
  
  }
  onReset(){

  }

  override initConfigAction(): void {
    this.configAction={
      title:"Học viên",
      component:StudentActionComponent
    }
  };

}
