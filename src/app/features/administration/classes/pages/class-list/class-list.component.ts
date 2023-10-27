import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseTableComponent } from '@shared/components';
import { ClassActionComponent } from '../../components';
import { ClassModel } from '../../models/class.model';
import { ClassService } from '../../services/class.service';
import { debounceTime, distinctUntilChanged, interval, map, mergeMap, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent extends BaseTableComponent<ClassModel> implements OnInit {
  searchInput = new FormControl();
  searchResults: any[] = [];
  constructor(inject:Injector, service:ClassService,private classService:ClassService) {
    super(inject,service);
  }
  override params: ClassModel = {
    className: '',
    teacherId: '',
    status: '',
    searchName:''
  }
  ngOnInit(): void {
    this.getData();
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

  getData(){
    this.searchInput.valueChanges
    .pipe(
     
      mergeMap((query: string) => this.classService.getSwitchMap(query))
    )
    .subscribe((results:any) => {
      console.log(results);
      this.searchResults = results.data;
    });

  }
}
