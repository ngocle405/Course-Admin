

export interface StudentModel {
    studentName: string;
    studentCode: string;
    status?: string | boolean;
    gender?: number|string;
    courseId?:string;
    courseName?:string;
}
export interface StateStudent {
    listStatus?: StateModel[];
    listCourse?: StudentModel[];
}
export interface StateModel {
    name: string;
    value?: string | boolean;
}
