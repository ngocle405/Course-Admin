export interface StateNewcategory {
  listStatus: CommonModel[];

}
export interface NewCategoryModel {
   newCategoryId?: string;
    newCategoryCode?: string |null;
    NewCategoryName?: string |null;
    Description?: string;
    status?: boolean|string;
    CreateDate?: string | null;
    CreateBy?: string;
    searchName?: string;
    searchCode?:string;
  }
 
  export interface CommonModel {
    code?: string;
    name?: string;
    value?: string | boolean;
  }
  