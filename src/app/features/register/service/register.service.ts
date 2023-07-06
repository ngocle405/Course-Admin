import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataTable } from '@cores/models/data-table.model';
import { BaseService } from '@cores/services/base.service';
import { mapDataTable } from '@cores/utils/common-functions';
import { environment } from '@env';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterService  extends BaseService {

  constructor(http:HttpClient) {
    super(http,`${environment.endpoint_url}/students`);
  }
  override getState(): Observable<any> {
    this.state={
      listStatus: [
        { value: true, name: 'Hoạt động' },
        { value: false, name: 'Đóng' },
        
      ],
      listAddressCompany: [
        { 
          value: 'Tòa nhà 21 Cát Linh, phường Cát Linh, quận Đống Đa, Hà Nội',
          name: 'Tòa nhà 21 Cát Linh, phường Cát Linh, quận Đống Đa, Hà Nội'
        },
        { 
          value: 'Tòa nhà 1 Ngọc Khánh Plaza, Phường Ngọc Khánh, Quận Ba Đình, Hà Nội',
          name: 'Tòa nhà 1 Ngọc Khánh Plaza, Phường Ngọc Khánh, Quận Ba Đình, Hà Nội' 
        },
      ],
      listLevel: [
        { value: 'Học sinh', name: 'Học sinh' },
        { value: 'Cao đẳng,ĐH', name: 'Cao đẳng,ĐH' },
        { value: 'Đã đi làm', name: 'Đã đi làm' },
        { value: 'Khác', name: 'Khác' },
      ],
      listKnow: [
        { value: 'facebook', name: 'Facebook' },
        { value: 'Báo chí', name: 'Báo chí' },
        { value: 'Diễn đàn', name: 'Diễn đàn' },
        { value: 'Thư NL Tech', name: 'Thư NL Tech' },
        { value: 'Khác', name: 'Khác' },
      ],
     
    }
    return forkJoin({
      getCourseList: this.getCourseList().pipe(catchError(() => of([]))),
    }).pipe(
      map((data: any) => {
        this.state = {
          ...this.state,
          ...data,
        };
        return this.state;
      })
    );
  }
  override search(params?: any): Observable<DataTable<any>> {
 
    return this.http
      .get<DataTable<any>>(`${this.baseUrl}/Register`, {
        params: { ...params },
      })
      .pipe(map((data) => mapDataTable(data, params)));
  }
  getCourseList() {
    return this.http.get<any>(`${environment.endpoint_url}/Courses`);
  }
}
