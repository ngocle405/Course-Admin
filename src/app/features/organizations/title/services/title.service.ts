import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';
import { CommonModel, StateTitle, TitleModel } from '../models/title.model';
import { saveAs } from 'file-saver';
import { NotificationMessageService } from 'src/app/core/services/message.service';

@Injectable({
  providedIn: 'root',
})
export class TitleService extends BaseService {
  constructor(http: HttpClient, private messageService: NotificationMessageService) {
    super(http, `${environment.endpoint_url}/titles`);
  }
  override state: StateTitle | undefined;

  override getState(): Observable<StateTitle> {
    this.state = {
      listStatus: [
        { name: 'Hoạt động', value: true },
        { name: 'Dừng hoạt động', value: false },
      ],
      listGrade: [],
      listJobPosition: [],
      
    };
    if (this.state) {
      if (this.state.listGrade.length === 0) {
        this.http.get<CommonModel>(`${environment.endpoint_url}/common-category/get-children/TITLV`).subscribe({
          next: (res: any) => {
            for (let item of res?.commons as CommonModel[]) {
              this.state?.listGrade.push(item);
            }
          },
          error: (err) => {
            this.messageService?.error('Có lỗi xảy ra, vui lòng thử lại sau');
          },
        });
      }
      if (this.state.listJobPosition.length === 0) {
        this.http.get<CommonModel>(`${environment.endpoint_url}/common-category/get-children/DUTY`).subscribe({
          next: (res: any) => {
            for (let item of res?.commons as CommonModel[]) {
              this.state?.listJobPosition.push(item);
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
  override update(data: TitleModel): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${data.code}`, data);
  }
}
