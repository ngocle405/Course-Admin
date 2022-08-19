export interface NewModel {
  newCategoryId?: string;
  newId?: string;
  title?: string;
  Description?: string;
  status?: boolean | string;
  CreateDate?: string | null;
  CreateBy?: string;
  newCategoryName?: string;
  searchName?: string;
}
export interface StateNew {
  newCategories: NewModel[];
  listStatus: CommonStateModel[];
}

export interface CommonStateModel {
  name?: string;
  value?: string | boolean;
  code?: string;
}
export interface PipeTransform {
  transform(value: any, ...args: any[]): any;
}
