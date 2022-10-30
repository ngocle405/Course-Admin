import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ScreenType } from '@cores/utils/enums';
import { BaseActionComponent } from '@shared/components';
import { extend, isEmpty } from 'lodash';
import { FileUpload } from 'primeng/fileupload';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-student-action',
  templateUrl: './student-action.component.html',
  styleUrls: ['./student-action.component.scss'],
})
export class StudentActionComponent extends BaseActionComponent implements OnInit {
  hiddenImage: boolean = false;

  constructor(inject: Injector, service: StudentService) {
    super(inject, service);
  }
  override form = this.fb!.group({
    courseId: ['', Validators.required],
    studentCode: ['HV-', Validators.required],
    studentName: ['', Validators.required],
    phone: [''],
    email: ['', Validators.required],
    gender: [1, Validators.required],
    dateOfBirth: ['', Validators.required],
    address: [''],
    description: [''],
    status: true,
    classId: [''],
    image: null,
  });
  ngOnInit(): void {
    if (this.screenType === ScreenType.Detail) {
      this.form.disable();
      this.hiddenImage = true;
    } else if (this.screenType === ScreenType.Update) {
      this.data.studentCode !== null ? this.form?.get('studentCode')!.disable() : null;
      this.hiddenImage = true;
    }
    if (this.data && this.screenType !== ScreenType.Create) {
      this.data.createDate = isEmpty(this.data.createDate) ? null : new Date(this.data.createDate);
      this.data.startDate = isEmpty(this.data.startDate) ? null : new Date(this.data.startDate);
      this.data.dateOfBirth = isEmpty(this.data.dateOfBirth) ? null : new Date(this.data.dateOfBirth);
      this.data.endDate = isEmpty(this.data.endDate) ? null : new Date(this.data.endDate);
      this.form.patchValue(this.data); //dùng cho sửa,detail
    }
  }
  uploadHandler(event: FileUpload) {
    const formData: FormData = new FormData();
    formData.append('uploadFiles', event.files[0]);
    this.service.UploadFileFormData(formData).subscribe({
      next: (file) => {
        this.form.get('image')?.setValue(file);
      },
      error: () => {
        this.messageService?.error('Có lỗi xảy ra');
      },
    });
  }
}
