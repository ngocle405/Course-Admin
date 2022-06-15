export interface NewModel {
  newCategoryId?: string;
  newId?: string;
  title?: string;
  Description?: string;
  status?: boolean | string;
  CreateDate?: string | null;
  CreateBy?: string;

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

