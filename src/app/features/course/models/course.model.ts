export interface CourseModel{
    
     searchName?:string;
     searchCode?:string;
     status?:boolean|string;
     courseCategoryId?:string;
     courseCategoryName?:string;
     teacherId?:string;
     teacherName?:string;

}
export interface StateCourse{
     listStatus:StateModel[];
     listCourseCategory:CourseModel[];
     listTeacher:CourseModel[];
}
export interface StateModel{
     value?:string|boolean|number|null;
     name?:string;
}