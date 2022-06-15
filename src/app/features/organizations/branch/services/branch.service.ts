import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, forkJoin, map, Observable, of, tap } from 'rxjs';
import { environment } from '@env';
import { BranchModel, StateListModel } from '../models';

import { OrganizationService } from '@organization-structure/services/organization-structure.service';
import { BaseService } from '@cores/services/base.service';
import { WorkLocationService } from '@work-location/services/work-location.service';

import { WorkLocationModel } from '@work-location/models/work-location.model';
import { OrganizationStructureModel } from '@organization-structure/models/organization-structure.model';
import { CATEGORY_GROUP_UNIT_CODE } from '@cores/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class BranchService extends BaseService {
  constructor(
    http: HttpClient,
  
    private organizationService: OrganizationService,
    private workLocationService: WorkLocationService
  ) {
    super(http, `${environment.endpoint_url}/branches`);
  }
  override state!: StateListModel;

  override update(data: BranchModel): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/${data.id}`, data);
  }
  override delete(code: string): Observable<void> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${code}`);
  }
}
