export interface CourseCategoryModel{
    searchName?:string;
    searchCode?:string;
    status?:boolean|string;
    code?:string;
    value?:string|boolean;
    name?:string|null;
}
export interface StateCourseCategory {

    listStatus: CourseCategoryModel[];
}