export interface StateJob {
  status: CommonStateModel[];
  titles: CommonTitleModel[];
  divisions: CommonDivisionModel[];
}

export interface JobModel {
  id?: string;
  code?: string;
  abbreviations?: string;
  vietnameseName?: string;
  englishName?: string;
  hasUnit?: boolean;
  unitCode?: string;
  titleCode?: string;
  divisionCode?: string;
  note?: string;
  changeCategory?: boolean;
  organizationCode?: string;
  status?: boolean | null;
  name?: string;
}

export interface CommonStateModel {
  code?: string;
  name?: string;
  value?: string | boolean;
}

export interface CommonDivisionModel {
  commons?: CommonStateModel[];
}

export interface CommonTitleModel {
  models?: CommonStateModel[];
}
