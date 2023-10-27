import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseTableComponent } from '@shared/components';
import { CourseCategoryActionComponent } from '../../components';
import { CourseCategoryModel, StateCourseCategory } from '../../models/course-category.model';
import { CourseCategoryService } from '../../services/course-category.service';
import { Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-course-category-list',
  templateUrl: './course-category-list.component.html',
  styleUrls: ['./course-category-list.component.scss']
})
export class CourseCategoryListComponent extends BaseTableComponent<CourseCategoryModel> implements OnInit {

  constructor(inject:Injector,service:CourseCategoryService) {
    super(inject,service);
  }
  override initConfigAction(): void {
    this.configAction={
      title:"danh mục khóa học",
      component:CourseCategoryActionComponent
    }
  };

  override stateData:StateCourseCategory | undefined;
  override params: CourseCategoryModel ={
      searchCode:'',
      searchName:'',
      status:''
  }
  onReset() {
    this.params = {
      searchCode: '',
      searchName: '',
      status: ''
    }
    this.search();
  }



  ngOnInit(): void {
  
  }

}
