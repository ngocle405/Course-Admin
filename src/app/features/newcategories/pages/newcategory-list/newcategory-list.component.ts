import { Component, Injector, OnInit } from '@angular/core';
import { BaseTableComponent } from 'src/app/shared/components';
import { NewcategoryActionComponent } from '../../components';

import { NewCategoryModel, StateNewcategory } from '../../models/newcategory.model';
import { NewcategoryService } from '../../services/newcategory.service';

@Component({
  selector: 'app-newcategory-list',
  templateUrl: './newcategory-list.component.html',

})
export class NewcategoryListComponent extends BaseTableComponent<NewCategoryModel> implements OnInit {

  constructor(injector:Injector,service: NewcategoryService) {
    super(injector,service);
  }

  override params: NewCategoryModel = {
    status: '',
    searchName:'',
    searchCode:''
  
  };
  override initConfigAction(): void {
    this.configAction={
      title:"danh mục tin tức",
      component:NewcategoryActionComponent
    }
  };
  override stateData!: StateNewcategory | undefined;
  onReset(){
    setTimeout(() => {
     this.search();
    }, 0);
   }
  ngOnInit(): void {
 
    this.fileNameExcel = 'loai-tin-tuc.xlsx';
  }

}

