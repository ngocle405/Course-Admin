import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';
import { OrganizationStructureModel } from '../models/organization-structure.model';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService extends BaseService {
  constructor(http: HttpClient) {
    super(http, `${environment.endpoint_url}/organization-structure`);
  }

  override findByCode(organizationCode: string): Observable<OrganizationStructureModel> {
    return this.http.get<OrganizationStructureModel>(`${this.baseUrl}/${organizationCode}`);
  }

  override update(data: OrganizationStructureModel): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${data.id}`, data);
  }
}
