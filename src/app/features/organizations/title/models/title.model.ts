export interface StateTitle {
  listStatus: CommonModel[];
  listGrade: CommonModel[];
  listJobPosition: CommonModel[];
}

export interface TitleModel {
  id?: string;
  code?: string;
  name?: string;
  vietnameseName?: string;
  englishName?: string;
  jobPositionCode?: string | null;
  gradeCode?: string | null;
  header?: boolean;
  leader?: boolean;
  note?: string;
  sortOrder?: string;
  status?: boolean | null;
  nameSearch?: string;
  page?: number;
  size?: number;
}

export interface CommonModel {
  name?: string;
  value?: string | boolean;
  code?: string;
}
