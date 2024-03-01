import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { LoadingService } from '@cores/services/loading.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { NotificationMessageService } from '../core/services/message.service';
import { ConfirmDialogComponent } from '../shared/components';

@Component({
  selector: 'app-main',
  template: `<div [class]="classNameLayout">
      <app-menu (staticMenu)="onStaticMenu($event)"></app-menu>
      <div [ngClass]="{ 'layout-main': true, 'layout-overflow-hidden': loading.loading }">
        <app-topbar></app-topbar>
        <!-- <app-rightpanel></app-rightpanel> -->
        <app-breadcrumb></app-breadcrumb>
        <!-- <div class="layout-mask" [ngClass]="{'layout-mask-active': menuActive}" (click)="onMaskClick()"></div> -->
        <div class="layout-content">
          <app-loading *ngIf="loading.loading"></app-loading>
          <router-outlet></router-outlet>
        </div>
        <!-- <app-footer></app-footer> -->
        <!-- <app-config></app-config> -->
      </div>
    </div>
    <p-toast></p-toast> `,
  providers: [MessageService, DialogService],
})
export class FeaturesComponent implements OnDestroy {
  constructor(
    private service: NotificationMessageService,
    private messageService: MessageService,
    public dialogService: DialogService,
    public loading: LoadingService,
    private ref: ChangeDetectorRef
  ) {
    this.subscription.push(
      this.service.subjectMessage.subscribe((notify) => {
        this.messageService.add(notify);
      })
    );
    this.subscription.push(
      this.service.subjectDialog.subscribe((data) => {
        this.showConfirm(data.key);
      })
    );
  }
  subscription: Subscription[] = [];
  classNameLayout = 'layout-wrapper layout-menu-light';

  showConfirm(key: string) {
    if (key === 'confirm') {
      const option: DynamicDialogConfig = {
        header: 'Confirm',
        width: '400px',
        baseZIndex: 10000,
      };
      const ref: DynamicDialogRef = this.dialogService.open(ConfirmDialogComponent, option);
      ref.onClose.subscribe((isConfirm: boolean) => {
        this.service.subjectDialog.next({ key: isConfirm ? 'accept' : 'reject' });
      });
    }
  }

  onStaticMenu(isLock: boolean) {
    this.classNameLayout = isLock
      ? 'layout-wrapper layout-menu-light layout-wrapper-static'
      : 'layout-wrapper layout-menu-light';
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
  //mới
  ngAfterContentChecked() {
    this.loading.showLoading.subscribe((res: boolean) => {
    });
    this.ref.detectChanges();
  }
}
