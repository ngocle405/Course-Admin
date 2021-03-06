import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { fromEvent, map, Observable, of } from 'rxjs';
import { BaseData } from '../abstract/base-data';
import { DataTable } from '../models/data-table.model';
import { mapDataTable } from '../utils/common-functions';
import { FileUpload } from 'primeng/fileupload';

@Injectable()
export class BaseService implements BaseData {
  constructor(public http: HttpClient, @Inject(String) public baseURL: string) {
    this.baseUrl = baseURL;
  }

  baseUrl!: string;
  state: any;

  getState(): Observable<any> {
    return of(this.state);
    
  }
  get(href: string = '', params: any = {}) {
    return this.http.get(this.baseURL + `${href}`, {
      params: params,
    });
  }
  search(params?: any, isPost?: boolean): Observable<DataTable<any>> {
    if (isPost) {
      return this.http.post<DataTable<any>>(`${this.baseUrl}`, params).pipe(map((data) => mapDataTable(data, params)));
    }
    return this.http
      .get<DataTable<any>>(`${this.baseUrl}/Paging`, {
        params: { ...params },
      })
      .pipe(map((data) => mapDataTable(data, params)));
  }

  findByCode(code: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${code}`);
  }
  findById(id: string|number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, data);
  }
  updateStatus(href:string='',id:string,data:any): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${href}/${id}`,  data)
  }

  updateAction(id:string,data: any): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${id}`, data);
  }
  update(data: any): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}`, data);
  }
  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getEncodeFromImage(fileUpload: FileUpload): Observable<any>{
    if (fileUpload) {
      if (fileUpload.files == null || fileUpload.files.length == 0) {
        return of('');
      }
      let file: File = fileUpload.files[0];
      let reader: FileReader = new FileReader();
      reader.readAsDataURL(file);
      return fromEvent(reader, 'load').pipe(
        map((e) => {
          let result = '';
          let tmp: any = reader.result;
          let baseCode = tmp.substring(tmp.indexOf('base64,', 0) + 7);
          result = file.name + ';' + file.size + ';' + baseCode;
          return result;
        })
      );
    } else {
      return of(null);
    }
  }
  exportExcel(fileName: string, params?: any): Observable<boolean> {
    return this.http.get(`${this.baseUrl}/export`, { params: { ...params }, responseType: 'arraybuffer' }).pipe(
      map((res) => {
        saveAs(
          new Blob([res], {
            type: 'application/octet-stream',
          }),
          fileName
        );
        return true;
      })
    );
  }
}
