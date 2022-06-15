import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';
import { ListService } from './list.service';
import * as _ from 'lodash';
import { CommonModel, CommonModels, StateListModel, WorkLocationModel } from '../models/work-location.model';

@Injectable({
  providedIn: 'root',
})
export class WorkLocationService extends BaseService {
  constructor(http: HttpClient, private serviceList: ListService) {
    super(http, `${environment.endpoint_url}/work-location`);
  }
  override state: StateListModel | undefined;

  override delete(code: string): Observable<void> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${code}`);
  }
  override update(data: WorkLocationModel): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${data.code}`, data);
  }

  override findByCode(code: string): Observable<WorkLocationModel> {
    return new Observable<WorkLocationModel>((observer) => {
      this.http.get<WorkLocationModel>(`${this.baseUrl}/${code}`).subscribe({
        next: (data) => {
          this.serviceList.getWarCode(data.wardCode!).subscribe({
            next: (list) => {
              data!.startDate = data.startDate ? new Date(data.startDate) : null;
              data!.endDate = data.endDate ? new Date(data.endDate) : null;
              data!.address = _.get(list, '[0].address');
              data!.districtCode = _.get(list, '[0].districtCode');
              data!.provinceCode = _.get(list, '[0].provinceCode');
              data!.wardCode = _.get(list, '[0].wardsCode');
              forkJoin([
                this.serviceList.getDistricts(_.get(list, '[0].provinceCode')),
                this.serviceList.getProvinces(_.get(list, '[0].countryCode')),
                this.serviceList.getWards(_.get(list, '[0].districtCode')),
              ]).subscribe({
                next: ([listDistrict, listProvince, listWard]) => {
                  data.districtList = listDistrict;
                  data.provinceList = listProvince;
                  data.wardList = listWard;
                  observer.next(data);
                },
              });
            },
          });
        },
      });
    });
  }

  override getState(): Observable<StateListModel> {
    this.state = {
      countriesList: [],
      countryList: [],
      provinceList: [],
      districtList: [],
      wardList: [],
      listGroupCode: [],
    };

    if (this.state) {
      if (this.state.countriesList.length === 0) {
        this.http.get<CommonModel>(`${environment.endpoint_url}/common-category/countries`).subscribe({
          next: (res: CommonModel) => {
            for (let item of res as CommonModel[]) {
              this.state?.countriesList.push(item);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }

      if (this.state.listGroupCode.length === 0) {
        this.http.get<CommonModels>(`${environment.endpoint_url}/common-category/get-children/GUNIT`).subscribe({
          next: (res: CommonModels) => {
            for (let item of res.commons as CommonModels[]) {
              this.state?.listGroupCode.push(item);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
    return of(this.state);
  }
}
