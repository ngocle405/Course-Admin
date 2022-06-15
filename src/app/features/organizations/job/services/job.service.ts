import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';
import { NotificationMessageService } from 'src/app/core/services/message.service';
import { environment } from 'src/environments/environment';
import { CommonStateModel, JobModel, StateJob } from '../models/job.model';
import { CommonJobService } from './common-job.service';

@Injectable({
  providedIn: 'root',
})
export class JobService extends BaseService {
  constructor(
    http: HttpClient,
    private commonJobService: CommonJobService,
    private messageService: NotificationMessageService
  ) {
    super(http, `${environment.endpoint_url}/job`);
  }
  override state: StateJob | undefined;

  override getState(): Observable<StateJob> {
    this.state = {
      status: [
        { name: 'Tất cả', value: '' },
        { name: 'Hoạt động', value: true },
        { name: 'Dừng hoạt động', value: false },
      ],
      titles: [],
      divisions: [],
    };
    if (this.state.divisions.length > 0 || this.state.titles.length > 0) {
      return of(this.state);
    } else {
      forkJoin({
        listTitles: this.commonJobService.getTitles().pipe(catchError(() => of([]))),
        listDivisions: this.commonJobService.getDivisions().pipe(catchError(() => of([]))),
      })
        .pipe(
          map(
            (data) =>
              <StateJob>{
                ...this.state,
                titles: data.listTitles,
                divisions: data.listDivisions,
              }
          )
        )
        .subscribe({
          next: (data: any) => {
            for (let item of data.titles.models) {
              this.state?.titles.push(item);
            }
            for (let item of data.divisions.commons) {
              this.state?.divisions.push(item);
            }
            console.log(this.state);
          },
          error: (err) => {
            this.messageService?.error('Có lỗi xảy ra, vui lòng thử lại sau');
          },
        });
    }
    return of(this.state);
  }

  override update(data: JobModel): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${data.id}`, data);
  }
}
