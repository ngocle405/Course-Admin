import { fromEvent, Subscription, of as observableOf } from 'rxjs';
import { Injector, OnDestroy, ChangeDetectorRef, Component, ViewChildren, QueryList } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileModel } from 'src/app/core/models/user-profile.model';
import { CommonCategoryService } from 'src/app/core/services/common-category.service';
import { SessionService } from 'src/app/core/services/session.service';
import { StreamDataService } from 'src/app/core/services/stream-data.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotificationMessageService } from 'src/app/core/services/message.service';
import { ScreenType, SessionKey } from 'src/app/core/utils/enums';
import { FunctionModel } from 'src/app/core/models/function.model';
import { cleanDataForm, validateAllFormFields } from 'src/app/core/utils/common-functions';
import * as _ from 'lodash';
import { BaseService } from 'src/app/core/services/base.service';
import { FileUpload } from 'primeng/fileupload';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  template: `<ng-content></ng-content>`,
})
export class BaseActionComponent implements OnDestroy {
  public objFunction: FunctionModel | undefined;
  public loading = true;
  @ViewChildren(FileUpload) files: QueryList<FileUpload> | any;
  protected messageService: NotificationMessageService | undefined;
  protected router: Router | undefined;
  protected route: ActivatedRoute | undefined;
  protected location: Location | undefined;
  protected streamDataService: StreamDataService | undefined;
  protected ref: ChangeDetectorRef | undefined;
  protected commonService: CommonCategoryService | undefined;
  protected fb: UntypedFormBuilder | undefined;
  protected refDialog!: DynamicDialogRef;
  protected configDialog!: DynamicDialogConfig;

  subscription: Subscription | undefined;
  subscriptions: Subscription[] = [];
  form = new UntypedFormGroup({});
  title: string | undefined;
  message = {
    create: {
      success: 'Thêm mới thành công',
      error: 'Thêm mới không thành công',
    },
    update: {
      success: 'Cập nhật thành công',
      error: 'Cập nhật không thành công',
    },
  };
  data: any;
  state: any;
  screenType: ScreenType | undefined;
  baseId: any;//id chung
  image:any;

  constructor(private injector: Injector, protected service: BaseService) {
    this.init();

    if (this.configDialog) {
      this.title = this.configDialog.header;
      this.data = this.configDialog.data?.model;
      this.screenType = this.configDialog?.data?.screenType;
      this.state = this.configDialog?.data?.state;
      this.baseId = this.configDialog?.data?.baseId;//gán vào baseid
      this. image=this.configDialog?.data.image;
    }
  }

  init() {
    this.messageService = this.injector.get(NotificationMessageService);
    this.fb = this.injector.get(UntypedFormBuilder);
    this.router = this.injector.get(Router);
    this.route = this.injector.get(ActivatedRoute);
    this.location = this.injector.get(Location);
    this.streamDataService = this.injector.get(StreamDataService);
    this.ref = this.injector.get(ChangeDetectorRef);
    this.refDialog = this.injector.get(DynamicDialogRef);
    this.configDialog = this.injector.get(DynamicDialogConfig);
  }

  save() {
    const data = this.getDataForm();
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

  getDataForm() {
    return cleanDataForm(this.form!);
  }

  create(data: any) {
   // this.form.get('image')?.value;
    this.service.getEncodeFromImage(this.files.first).subscribe({
      next: (res) => {
        let data_image = res == ''; 
        if(data_image){
          this.messageService!.warn('Bạn chưa chọn ảnh');
          return ;
        }
        data.image =res;
        this.service.create(data).subscribe({
          next: () => {
            this.messageService!.success(this.message.create.success);
            this.refDialog.close(true);
          },
          error: (err) => {
            this.messageService!.error(err.error.message);
          },
        });
      }
    });
  }

  update(data: any) {
    this.service.getEncodeFromImage(this.files.first).subscribe({
      next: (res) => {
        let data_image = res == '' ? null : res;
        data.image = data_image;
        this.service.updateAction(this.baseId, data).subscribe({
          next: () => {
            this.messageService!.success(this.message.update.success);
            this.refDialog.close(true);
          },
          error: (err) => {
            this.messageService!.error(err.error.message);
          },
        });
      }
    });
    
  }

  cancel() {
    if (this.configDialog) {
      this.refDialog.close();
    } else {
      this.location!.back();
    }
  }

  onDestroy() { }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptions?.forEach((sub) => {
      sub.unsubscribe();
    });
    this.onDestroy();
  }
}
