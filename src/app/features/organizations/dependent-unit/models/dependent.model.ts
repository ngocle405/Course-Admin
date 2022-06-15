export interface DependentUnitModel {
  id?: string;
  code?: string;
  t24Code?: string;
  name?: string;
  englishName?: string;
  codeCenter?: string;
  hasParentAddresses?: boolean;
  workLocation?: string;
  address?: string;
  sortOrder?: string;
  organizationCode?: string;
  groupCode?: string;
  parentCode?: string;
  vietnameseName?: string;
  status?: boolean;
  note?: string;
  createdBy?: string;
  createdDate?: string;
  updateBy?: string;
  updateDate?: string;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  systemcode?: string;
  versionCode?: string;
  inDomestic?: boolean;
  abbreviation?: string;
  page?: number;
  size?: number;
  countryCode?: string;
  provinceCode?: string;
  districtCode?: string;
  wardCode?: string;
  countryList?: CommonModel[];
  provinceList?: CommonModel[];
  districtList?: CommonModel[];
  wardList?: CommonModel[];
}

export interface CommonModel {
  code?: string;
  name?: string;
  vnName?: string;
  commons?: CommonModel[];
  models?: CommonModel[];
}
export interface StateDependentUnit {
  countryList: CommonModel[];
  provinceList: CommonModel[];
  districtList: CommonModel[];
  wardList: CommonModel[];
  listGroupCode: CommonModel[];
  listworkLocation: CommonModel[];
}

export interface City {
  name: string;
  value: string;
}
