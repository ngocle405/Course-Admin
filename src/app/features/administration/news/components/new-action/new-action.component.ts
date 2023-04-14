import { Component, Injector, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Validators } from '@angular/forms';
import { cleanDataForm, validateAllFormFields } from '@cores/utils/common-functions';
import { ScreenType } from '@cores/utils/enums';
import { BaseActionComponent } from '@shared/components';
import * as _ from 'lodash';
import { FileUpload } from 'primeng/fileupload';
import { NewService } from '../../services/new.service';

@Component({
  selector: 'app-new-action',
  templateUrl: './new-action.component.html',
  styleUrls: ['./new-action.component.scss'],
})
export class NewActionComponent extends BaseActionComponent implements OnInit {
  constructor(injector: Injector, private serviceNew: NewService) {
    super(injector, serviceNew);
  }

   form = this.fb!.group({
    title: ['', Validators.required],
    status: true,
    detail: ['', Validators.required],
    newCategoryId: ['', [Validators.required]],
    type: [''],
    description: [''],
    image: [''],
  });
  hiddenImage: boolean = false;
  ngOnInit(): void {
    if (this.screenType === ScreenType.Detail) {
      this.form.disable();
      this.hiddenImage = true;
    } else if (this.screenType === ScreenType.Update) {
      this.hiddenImage = true;
    }
    if (this.data && this.screenType !== ScreenType.Create) {
      this.data.createDate = _.isEmpty(this.data.createDate) ? null : new Date(this.data.createDate);
      this.form.patchValue(this.data); //dùng cho sửa,detail
    }
  }
  uploadHandler(event: FileUpload) {
    const formData: FormData = new FormData();
    formData.append('uploadFiles', event.files[0]);

    this.serviceNew.UploadFileFormData(formData).subscribe({
      next: (file) => {
        this.form.get('image')?.setValue(file);
      },
      error: (err) => {
        this.messageService?.error(err.error.message);
      },
    });
  }
   save() {
    if (!this.loadingService.loading) {
      return;
    }
    if (_.isEmpty(this.form.get('image')?.value)) {
      this.messageService?.info('Bạn chưa chọn ảnh đại diện');
      return;
    }
    const data = cleanDataForm(this.form);
    if (this.form?.status === 'VALID') {
      this.messageService?.confirm().subscribe((isConfirm) => {
        if (isConfirm) {
          if (this.screenType == ScreenType.Create) {
            this.create(data);
          } else {
            this.update(data);
          }
        }
      });
    } else {
      validateAllFormFields(this.form!);
    }
  }
}
