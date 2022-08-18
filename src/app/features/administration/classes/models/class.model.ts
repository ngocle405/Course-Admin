export interface ClassModel {
    classId?: string;
    className?: string;
    classCode?: string;
    startDate?: string;
    endDate?: string;
    teacherId?: string;
    teacherName?: string;
    status?: string;
    searchName?:string;
}
export interface TeacherModel{
    teacherId:string;
    teacherName:string;
}