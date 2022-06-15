import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';
import { NotificationMessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import { StateJobDescription, JobDescriptionModel, CommonModel } from '../models/job-description.model';

@Injectable({
  providedIn: 'root',
})
export class JobDescriptionService extends BaseService{
  constructor(http: HttpClient, private messageService: NotificationMessageService) {
    super(http, `${environment.endpoint_url}/job-descriptions`);
  }
  override state: StateJobDescription | undefined;

  override getState(): Observable<StateJobDescription> {
    this.state = {
      listStatus: [
        { name: 'Tất cả', value: '' },
        { name: 'Hoạt động', value: true },
        { name: 'Dừng hoạt động', value: false },
      ],
      listDirectlyReport: [
        { name: 'Trực tiếp', value: 'DirectlyReport' },
        { name: 'Gián tiếp', value: 'InDirectlyReport' },
      ],
      listInDirectlyReport: [
        { name: 'Trực tiếp', value: 'DirectlyReport' },
        { name: 'Gián tiếp', value: 'InDirectlyReport' },
      ],
      listPermission: [
        { name: 'Quyền 1', value: 'Permission1' },
        { name: 'Quyền 2', value: 'Permission2' },
      ],
      listMajor: [],
      listCapacityGroup: [],
    };
    if (this.state) {
      if (this.state.listCapacityGroup.length === 0) {
        this.http.get<CommonModel>(`${environment.endpoint_url}/common-category/capacity-group/drop-list`).subscribe({
          next: (res: CommonModel) => {
            for (let item of res as CommonModel[]) {
              this.state?.listCapacityGroup.push(item);
            }
          },
          error: (err) => {
            this.messageService?.error('Có lỗi xảy ra, vui lòng thử lại sau');
          },
        });
      }
      if (this.state.listMajor.length === 0) {
        this.http.get<CommonModel>(`${environment.endpoint_url}/v1/major/1/100`).subscribe({
          next: (res: any) => {
            for (let item of res?.models as CommonModel[]) {
              this.state?.listMajor.push(item);
            }
          },
          error: (err) => {
            this.messageService?.error('Có lỗi xảy ra, vui lòng thử lại sau');
          },
        });
      }
      return of(this.state);
    } else {
      return of();
    }
  }

  override update(data: JobDescriptionModel): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${data.id}`, data);
  }
}
