export interface StateJobDescription {
  listStatus: CommonModel[];
  listDirectlyReport: CommonModel[];
  listInDirectlyReport: CommonModel[];
  listPermission: CommonModel[];
  listMajor: CommonModel[];
  listCapacityGroup: CommonModel[];
}

export interface JobDescriptionModel {
  id?: string;
  jobId?: string;
  jobCode?: string;
  hasUnit?: boolean;
  unitCode?: string;
  descriptionVersion?: string;
  directlyReport?: string;
  indirectReport?: string;
  rdReport?: string;
  riReport?: string;
  function?: string;
  power?: string;
  responsibilityDTOS?: [];
  age?: number;
  experience?: number;
  educationLevel?: string;
  note?: string;
  startDate?: string;
  endDate?: string;
  majorDTOS?: [];
  capacityGroupDTOS?: [];
  status?: boolean;
}

export interface CommonModel {
  levels?: CommonModel[];
  code?: string;
  name?: string;
  value?: string | boolean;
  commons?: CommonModel[];
  models?: CommonModel[];
}
