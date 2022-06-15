
import { OrganizationStructureModel } from '@organization-structure/models/organization-structure.model';
import { WorkLocationModel } from '@work-location/models/work-location.model';

export interface BranchModel {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  vietnameseName?: string;
  englishName?: string;
  status?: boolean | string;
  groupCode?: string;
  t24Code?: string;
  organizationCode?: string;
  group?: string;
  codeCenter?: string;
  phone?: number;
  fax?: string;
  accountNumber?: number;
  accountName?: string;
  accountBank?: string;
  area?: string;
  vietnameseAddress?: string;
  englishAddress?: string;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  note?: string;
  workLocation?: string;
  address?: string;
  page?: number;
  size?: number;
  countryCode?: string;
  provinceCode?: string;
  districtCode?: string;
  wardCode?: string;
  versionCode?: string;
  inDomestic?: boolean;

}
export interface StateListModel {
  
  listOrganization: OrganizationStructureModel[];
  listWorkLocation: WorkLocationModel[];
  
}
