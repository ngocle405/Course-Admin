

export interface StudentModel {
    studentName: string;
    studentCode: string;
    status?: string | boolean;
    gender?: number|string;
    courseId?:string|null;
    courseName?:string;
    searchName?:string;
    searchCode:string;
    classId:string;
}
export interface StateStudent {
    listStatus?: StateModel[];
    listCourse?: StudentModel[];
}
export interface StateModel {
    name: string;
    value?: string | boolean;
}
export interface ClasstModel {
    classId: string;
    className: string;
}
