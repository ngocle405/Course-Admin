export interface PaymentModel {
    paymentId?: string;
    money?: number;
    courseId?: string;
    contentPayment?: string;
    statusPayment?: boolean|string|null;
    searchName?:string;
    status?:string|boolean|null;
}
export interface CourseModel {
    courseName: string;
    courseId: string;
}
export interface StudentModel {
    studentName: string;
    studentId: string;
}