import { Subscription } from 'rxjs';
import { Injector, OnDestroy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileModel } from 'src/app/core/models/user-profile.model';
import { CommonCategoryService } from 'src/app/core/services/common-category.service';
import { SessionService } from 'src/app/core/services/session.service';
import { StreamDataService } from 'src/app/core/services/stream-data.service';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationMessageService } from 'src/app/core/services/message.service';
import { ScreenType, SessionKey } from 'src/app/core/utils/enums';
import { FunctionModel } from 'src/app/core/models/function.model';
import { DataTable } from 'src/app/core/models/data-table.model';
import { BaseService } from 'src/app/core/services/base.service';
import { PaginatorModel } from 'src/app/core/models/paginator.model';
import { ActionConfig } from 'src/app/core/models/action-config.model';
import { cloneDeep } from 'lodash';
import * as _ from 'lodash';

@Component({
  template: `<ng-content></ng-content>`,
  providers: [DialogService],
})
export class BaseTableComponent<M> implements OnDestroy {
  public objFunction: FunctionModel | undefined;
  public loading = true;
  public currUser: UserProfileModel;

  protected messageService: NotificationMessageService | undefined;
  protected dialogService: DialogService | undefined;
  protected router: Router | undefined;
  protected route: ActivatedRoute | undefined;
  protected location: Location | undefined;
  protected streamDataService: StreamDataService | undefined;
  protected sessionService: SessionService | undefined;
  protected ref: ChangeDetectorRef | undefined;
  protected commonService: CommonCategoryService | undefined;
  protected fb: FormBuilder | undefined;

  stateData: any;
  propData: any;
  dataTable: DataTable<M> = {
    content: [],
    currentPage: 1,
    size: 10,
    totalElements: 1,
    totalPages: 0,
    totalRecords: 0,
   

  };
  configAction: ActionConfig | undefined;
  prevParams: any;
  params: M | FormGroup | undefined;
  fileNameExcel = 'list-data.xlsx';
  subscription: Subscription | undefined;
  subscriptions: Subscription[] = [];

  constructor(private injector: Injector, protected service: BaseService) {
    this.init();
    this.initConfigAction();
    this.getState();
    this.currUser = this.sessionService?.getSessionData(SessionKey.UserProfile);
    
  }

  init() {
    this.messageService = this.injector.get(NotificationMessageService);
    this.dialogService = this.injector.get(DialogService);
    this.fb = this.injector.get(FormBuilder);
    this.router = this.injector.get(Router);
    this.route = this.injector.get(ActivatedRoute);
    this.location = this.injector.get(Location);
    this.streamDataService = this.injector.get(StreamDataService);
    this.sessionService = this.injector.get(SessionService);
    this.ref = this.injector.get(ChangeDetectorRef);
    this.commonService = this.injector.get(CommonCategoryService);
  }

  initConfigAction() { }

  getState() {
    this.service.getState().subscribe({
      next: (state) => {
        this.propData = cloneDeep(state);
        this.stateData = cloneDeep(state);
        this.mapState();
        this.search();
     
      },
    });
  }

  mapState() { }

  search(firstPage?:boolean) {
    if (firstPage) {
      this.dataTable.currentPage = 0;
    }

    this.loading = true;
    const params = this.mapDataSearch();
  
    this.service.search(<M>(<unknown>params)).subscribe({
      next: (data) => {
        this.dataTable = data;
       
        this.loading = false;
        this.prevParams = params;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
  mapDataSearch() {
    const params = {
      pageIndex: this.dataTable.currentPage,
      pageSize: this.dataTable.size,
    
      ...this.params,
     
    };
    return <M>(<unknown>params);
  }

  pageChange(paginator: PaginatorModel) {

    if (this.dataTable.currentPage === 0) {
      this.dataTable.currentPage = paginator.page;
    } else {
      this.dataTable.currentPage = paginator.page + 1;
    }
    this.dataTable.size = paginator.rows;
    this.search();

  }

  viewCreate() {
    if (!this.configAction?.component) {
      return;
    }
    const dialog = this.dialogService?.open(this.configAction!.component, {
      header: `Thêm mới ${this.configAction.title.toLowerCase()}`,
      showHeader: false,
      width: this.configAction.dialog?.width || '85%',
      data: {
        screenType: ScreenType.Create,
        state: this.propData,
      },
    });
    dialog?.onClose.subscribe({
      next: (isSuccess) => {
        if (isSuccess) {
          this.search();
        }
      },
    });
  }

  viewEdit(id: string) {
    if (this.loading || !this.configAction?.component) {
      return;
    }
   
    this.loading = true;
    this.service.findById(id).subscribe({
      next: (data: M) => {
     
        const dialog = this.dialogService?.open(this.configAction!.component, {
          header: `Cập nhật ${this.configAction!.title.toLowerCase()}`,
          showHeader: false,
          width: this.configAction!.dialog?.width || '85%',
          data: {
            image:_.get(data,'image'),
            model: data,
            baseId: id,
            state: this.propData,
            screenType: ScreenType.Update,
          },
        });
        dialog?.onClose.subscribe({
          next: (isSuccess) => {
            if (isSuccess) {
              this.search();
            }
          },
        });
        this.loading = false;
      },
      error: (e) => {
        this.loading = false;
        this.messageService?.error('Có lỗi xảy ra, vui lòng thử lại sau');
      },
    });
  }

  viewDetail(code: string) {
    if (this.loading || !this.configAction?.component) {
      return;
    }
    this.loading = true;
    this.service.findById(code).subscribe({
      next: (data: any) => {
        this.dialogService?.open(this.configAction!.component, {
          header: `Chi tiết ${this.configAction!.title.toLowerCase()}`,
          showHeader: false,
          width: this.configAction!.dialog?.width || '85%',
          data: {
            model: data,
            state: this.stateData,
            screenType: ScreenType.Detail,
            image:_.get(data,'image'),
          },
        });
        this.loading = false;
      },
      error: (e) => {
        this.loading = false;
        this.messageService?.error('Có lỗi xảy ra, vui lòng thử lại sau');
      },
    });
  }

  deleteItem(id: string | number) {
    if (this.loading) {
      return;
    }
    this.messageService?.confirm().subscribe((isConfirm) => {
      if (isConfirm) {
        this.loading = true;
        this.service.delete(id).subscribe({
          next: () => {
            this.messageService?.success('Thực hiện xoá bản ghi thành công');
            this.search();
          },
          error: (e) => {
            this.loading = false;
            this.messageService?.error('Có lỗi xảy ra, vui lòng thử lại sau');
          },
        });
      }
    });
  }

  exportExcel() {
    this.loading = true;
    this.service.exportExcel(this.fileNameExcel, this.prevParams).subscribe({
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.messageService?.error('Có lỗi xảy ra, vui lòng thử lại sau');
      },
    });
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
