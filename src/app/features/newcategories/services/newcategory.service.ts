import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';
import { NotificationMessageService } from 'src/app/core/services/message.service';

import { environment } from 'src/environments/environment';
import { NewCategoryModel, StateNewcategory } from '../models/newcategory.model';


@Injectable({
  providedIn: 'root'
})
export class NewcategoryService extends BaseService {

  constructor(http:HttpClient,private messageService: NotificationMessageService) {
    super(http,`${environment.endpoint_url}/newcategories`);
  }
  override state: StateNewcategory | undefined;
  override getState(): Observable<StateNewcategory> {
    this.state = {
      listStatus: [
        {name:'Tất cả',value:''},
        { name: 'Hoạt động', value: true },
        { name: 'Dừng hoạt động', value: false },
      ],
    };
    return of(this.state);
    
  }
}
