import { Component, Injector, OnInit } from '@angular/core';
import { BaseTableComponent } from '@shared/components';
import { NewActionComponent } from '../../components';

import { NewModel, StateNew } from '../../models/new.model';
import { NewService } from '../../services/new.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent extends BaseTableComponent<NewModel> {

  constructor(inject:Injector,service:NewService) {
    super(inject,service);
  }
  override stateData!: StateNew ;
  
  override params: NewModel = {
    searchName:'',
    newCategoryId:'',
    title:'',
    newCategoryName:''
  };
  onReset(){
    setTimeout(() => {
    this.params.searchName = '';
    this.params.status='';
   this.params. newCategoryId=''
    this.search();
    }, 0);
   }
   override initConfigAction(): void {
    this.configAction={
      title:"Tin tức",
      component:NewActionComponent
    }
  };
  override mapState():void{
    this.stateData?.newCategories.unshift({ newCategoryName: 'Tất cả', newCategoryId: '' });
  }
  ngOnInit(): void {//khởi tạo rỗng ở oninit để tránh underfil trong thời gian đợi gọi api (tránh lỗi)
   
    if (!this.stateData) {
      this.stateData = {
    
        newCategories:[],
        listStatus: [],
      };
    }

    this.fileNameExcel="Tin-tuc.xlsx";
  }

}
