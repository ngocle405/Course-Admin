import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseTableComponent } from '@shared/components';
import { ClassActionComponent } from '../../components';
import { ClassModel } from '../../models/class.model';
import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent extends BaseTableComponent<ClassModel> implements OnInit {

  constructor(inject:Injector,service:ClassService) {
    super(inject,service);
  }
  override params: ClassModel = {
    className: '',
    teacherId: '',
    status: '',
    searchName:''
  }
  ngOnInit(): void {
    if (!this.stateData) {
      this.stateData = {
        listStatus: [],
      };
    }
  }
  override mapState():void{
    this.stateData?.listStatus.unshift({ name: 'Tất cả', value: '' });
    this.stateData?.listTeacher.unshift({ teacherName: 'Tất cả', teacherId: '' });
  }
  override initConfigAction(): void {
    this.configAction={
      title:"Lớp học",
      component:ClassActionComponent
    }
  };
  onReset(){
     this.params={
      className: '',
      teacherId: '',
      status: '',
      searchName:''
     }
    this.search();
   }

}
