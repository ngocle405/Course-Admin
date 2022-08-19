import { Observable, Subscription, of } from 'rxjs';
import { Injector, OnDestroy, ChangeDetectorRef, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileModel } from 'src/app/core/models/user-profile.model';
import { CommonCategoryService } from 'src/app/core/services/common-category.service';
import { SessionService } from 'src/app/core/services/session.service';
import { StreamDataService } from 'src/app/core/services/stream-data.service';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationMessageService } from 'src/app/core/services/message.service';
import { SessionKey } from 'src/app/core/utils/enums';
import { FunctionModel } from 'src/app/core/models/function.model';

@Component({
  template: `<ng-content></ng-content>`,
  providers: [DialogService],
})
export class BaseComponent implements OnDestroy {
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
  protected fb: UntypedFormBuilder | undefined;

  subscription: Subscription | undefined;
  subscriptions: Subscription[] = [];

  constructor(private injector: Injector) {
    this.init();
    this.currUser = this.sessionService?.getSessionData(SessionKey.UserProfile);
  }

  init() {
    this.messageService = this.injector.get(NotificationMessageService);
    this.dialogService = this.injector.get(DialogService);
    this.fb = this.injector.get(UntypedFormBuilder);
    this.router = this.injector.get(Router);
    this.route = this.injector.get(ActivatedRoute);
    this.location = this.injector.get(Location);
    this.streamDataService = this.injector.get(StreamDataService);
    this.sessionService = this.injector.get(SessionService);
    this.ref = this.injector.get(ChangeDetectorRef);
    this.commonService = this.injector.get(CommonCategoryService);
  }

  back() {
    this.location!.back();
  }

  getErrorControl(form: UntypedFormGroup, key: string, validator: string): boolean {
    return form.get(key)!.errors && form.get(key)!.errors![validator] && form.get(key)?.touched;
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
