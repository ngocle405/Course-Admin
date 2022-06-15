import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';
import { CommonModel, DependentUnitModel, StateDependentUnit } from '../models/dependent.model';
import { ListDropdownService } from './list-dropdown.service';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root',
})
export class DependentService extends BaseService implements OnDestroy {
  constructor(http: HttpClient, private serviceList: ListDropdownService) {
    super(http, `${environment.endpoint_url}/dependent-units`);
  }

  override update(data: DependentUnitModel): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${data.id}`, data);
  }

  override state: StateDependentUnit | undefined;

  override findByCode(code: string): Observable<DependentUnitModel> {
    return new Observable<DependentUnitModel>((observer) => {
      this.http.get<DependentUnitModel>(`${this.baseUrl}/${code}`).subscribe({
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

  override getState(): Observable<StateDependentUnit> {
    this.state = {
      countryList: [],
      provinceList: [],
      districtList: [],
      wardList: [],
      listGroupCode: [],
      listworkLocation: [],
    };

    if (this.state) {
      if (this.state.countryList.length === 0) {
        this.http.get<CommonModel>(`${environment.endpoint_url}/common-category/countries`).subscribe({
          next: (res: CommonModel) => {
            for (let item of res as CommonModel[]) {
              this.state?.countryList.push(item);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }

      if (this.state.listGroupCode.length === 0) {
        this.http.get<CommonModel>(`${environment.endpoint_url}/common-category/get-children/GUNIT`).subscribe({
          next: (res: CommonModel) => {
            for (let item of res.commons as CommonModel[]) {
              this.state?.listGroupCode.push(item);
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }

      if (this.state.listworkLocation.length === 0) {
        this.http.get<CommonModel>(`${environment.endpoint_url}/work-location`).subscribe({
          next: (res: CommonModel) => {
            for (let item of res.models as CommonModel[]) {
              this.state?.listworkLocation.push(item);
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

  ngOnDestroy(): void {}
}
