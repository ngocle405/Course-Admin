export interface WorkLocationModel {
  id?: number;
  code?: string;
  vnName?: string;
  enName?: string;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  isHeadquarters?: boolean;
  status?: boolean | string;
  note?: string;
  groupCode?: string | null;
  address?: string;
  page?: number;
  size?: number;
  createdBy?: string;
  createdDate?: Date;
  countryCode?: string;
  provinceCode?: string;
  districtCode?: string;
  wardCode?: string;
  versionCode?: string;
  organizationCode?: string;
  countriesList?: CommonModel[];
  countryList?: CommonModel[];
  provinceList?: CommonModel[];
  districtList?: CommonModel[];
  wardList?: CommonModel[];
}
export interface StateListModel {
  countriesList: CommonModel[];
  countryList: CommonModel[];
  provinceList: CommonModel[];
  districtList: CommonModel[];
  wardList: CommonModel[];
  listGroupCode: CommonModel[];
}

export interface CommonModel {
  code?: string;
  name?: string;
}
export interface CommonModels {
  code: string;
  name: string;
  commons?: CommonModel[];
}
