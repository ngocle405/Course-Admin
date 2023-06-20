import { fromEvent, Subscription, of as observableOf } from 'rxjs';
import { Injector, OnDestroy, ChangeDetectorRef, Component, ViewChildren, QueryList,Input } from '@angular/core';
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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '@cores/services/loading.service';

@Component({
  template: `<ng-content></ng-content>`,
})
export class BaseActionComponent implements OnDestroy {
  public objFunction: FunctionModel | undefined;
  public loadingService!: LoadingService;
  @ViewChildren(FileUpload) files: QueryList<FileUpload> | any;
  @Input() uppercase: boolean = false;
  protected messageService: NotificationMessageService | undefined;
  protected router: Router | undefined;
  protected route: ActivatedRoute | undefined;
  protected location: Location | undefined;
  protected streamDataService: StreamDataService | undefined;
  protected ref: ChangeDetectorRef | undefined;
  protected commonService: CommonCategoryService | undefined;
  protected fb: FormBuilder | undefined;
  protected refDialog!: DynamicDialogRef;
  protected configDialog!: DynamicDialogConfig;

  subscription: Subscription | undefined;
  subscriptions: Subscription[] = [];
  //form = new FormGroup({}) ;
  title: string | undefined;
  data: any;
  state: any;
  screenType: ScreenType | undefined;
  image: any;
  baseId:string ='';

  constructor(private injector: Injector, protected service: BaseService) {
    this.init();
    if (this.configDialog) {
      this.title = this.configDialog.header;
      this.data = this.configDialog.data?.model;
      this.screenType = this.configDialog?.data?.screenType;
      this.state = this.configDialog?.data?.state;
      this.image = this.configDialog?.data?.image;
      this.baseId=this.configDialog.data.baseId;
    }
  }

  init() {
    this.messageService = this.injector.get(NotificationMessageService);
    this.fb = this.injector.get(FormBuilder);
    this.router = this.injector.get(Router);
    this.route = this.injector.get(ActivatedRoute);
    this.location = this.injector.get(Location);
    this.streamDataService = this.injector.get(StreamDataService);
    this.ref = this.injector.get(ChangeDetectorRef);
    this.refDialog = this.injector.get(DynamicDialogRef);
    this.configDialog = this.injector.get(DynamicDialogConfig);
    this.loadingService = this.injector.get(LoadingService);
  }
  getValue(obj: any, path: string) {
    return _.get(obj, path);
  }
  onInput(event: any) {
    // if (this.onlyNumber) {
    //   event.target.value = event?.target?.value?.replace(/\D+/g, '');
    // } else if (this.uppercase) {
    //   event.target.value = event?.target?.value.toUpperCase();
    // } else if (this.noSpace){
    //   event.target.value = event?.target?.value?.replace(/\s+/g, '');
    // }
    if (this.uppercase) {
      event.target.value = event?.target?.value.toUpperCase();
    } else {
      event.target.value = event?.target?.value;
    }
    // this.value = event?.target?.value;
    // this.onChange(this.value);
  }
  // save() {
  //   if (this.loadingService.loading) {
  //     return;
  //   }
  //   const data = cleanDataForm(this.form);
  //   if (this.form?.status === 'VALID') {
  //     this.messageService?.confirm().subscribe((isConfirm) => {
  //       if (isConfirm) {
  //         if (this.screenType == ScreenType.Create) {
  //           this.create(data);
  //         } else {
  //           this.update(data);
  //         }
  //       }
  //     });
  //   } else {
  //     validateAllFormFields(this.form!);
  //   }
  // }

  create(data: any) {
    this.loadingService.start();
    this.service.create(data).subscribe({
      next: () => {
        this.messageService!.success('Thêm mới thành công');
        this.refDialog.close(true);
        this.loadingService.complete();
      },
      error: (err) => {
        this.messageService!.error('Có lỗi xảy ra');
        this.loadingService.complete();
      },
    });
  }

  update(data: any) {
    this.loadingService.start();

    this.service.updateAction(this.baseId, data).subscribe({
      next: () => {
        this.messageService!.success('Cập nhật thành công');
        this.refDialog.close(true);
        this.loadingService.complete();
      },
      error: () => {
        this.messageService!.error('Có lỗi xảy ra');
        this.loadingService.complete();
      },
    });
  }

  cancel() {
    if (this.configDialog) {
      this.refDialog.close();
    } else {
      this.location!.back();
    }
  }

  onDestroy() {}

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptions?.forEach((sub) => {
      sub.unsubscribe();
    });
    this.onDestroy();
  }
}
