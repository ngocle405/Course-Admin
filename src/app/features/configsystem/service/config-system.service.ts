import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '@cores/services/base.service';
import { environment } from '@env';
import { Observable, of } from 'rxjs';
import { ConfigSystemModel, StateCofigSystem } from '../models/config-system.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigSystemService extends BaseService {

  constructor(http:HttpClient) {
    super(http,`${environment.endpoint_url}/ConfigSystems`);
  }
  override state!: StateCofigSystem |undefined;
  override getState(): Observable<StateCofigSystem> {
    this.state = {
      listStatus: [
        { name: 'Tất cả', value: '' },
        { name: 'Hoạt động', value: true },
        { name: 'Dừng hoạt động', value: false },
      ],
    };
    return of(this.state);
  }
  deleteSelected(data:any){
    return this.http.delete<any[]>(`${this.baseUrl}/range`, data);
  }
}
