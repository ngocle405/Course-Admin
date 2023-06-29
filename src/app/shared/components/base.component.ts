import { Observable, Subscription, of } from 'rxjs';
import { Injector, OnDestroy, ChangeDetectorRef, Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileModel } from 'src/app/core/models/user-profile.model';
import { SessionService } from 'src/app/core/services/session.service';
import { StreamDataService } from 'src/app/core/services/stream-data.service';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationMessageService } from 'src/app/core/services/message.service';
import { SessionKey } from 'src/app/core/utils/enums';
import { FunctionModel } from 'src/app/core/models/function.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoadingService } from '@cores/services/loading.service';
import * as _ from 'lodash';

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
  protected fb: FormBuilder | undefined;
  protected loadingService!: LoadingService;
  subscription: Subscription | undefined;
  subscriptions: Subscription[] = [];

  constructor(private injector: Injector) {
    this.init();
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
    this.loadingService = this.injector.get(LoadingService);
  }

  back() {
    this.location!.back();
  }
  getValue(obj: any, path: string) {
    return _.get(obj, path);
  }
  getErrorControl(form: FormGroup, key: string, validator: string): boolean {
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
