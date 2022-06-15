import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';
import { environment } from 'src/environments/environment';
import { OrganizationChartModel } from '../models/organization-chart.model';

@Injectable({
  providedIn: 'root',
})
export class OrganizationChartService extends BaseService {
  constructor(http: HttpClient) {
    super(http, `${environment.endpoint_url}/organization-chart`);
  }

  getDataTree(): Observable<OrganizationChartModel[]> {
    return this.http.get<OrganizationChartModel[]>(this.baseUrl);
  }
}
