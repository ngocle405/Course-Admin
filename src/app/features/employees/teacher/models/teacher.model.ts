export interface TeacherModel{
    searchCode?:string,
    searchName?:string,
    status?:string|boolean;
}
export interface StateTeacher{
    listStatus:StateModel[];
}
export interface StateModel{
    value?:string|boolean|number|null;
    name?:string;
}