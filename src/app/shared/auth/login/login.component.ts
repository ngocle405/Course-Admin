import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '@cores/services/loading.service';
import { LoginService } from '@cores/services/login.service';
import { NotificationMessageService } from '@cores/services/message.service';
import { cleanDataForm, validateAllFormFields } from '@cores/utils/common-functions';
import { CHARACTERS } from '@cores/utils/constants';
import { MessageService } from 'primeng/api';
import { Subscription, finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit,OnDestroy {
  showPass = true;
  loaded:boolean=false;
  showPassword() {
    this.showPass = !this.showPass;
  }
  
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
   private notifyService:NotificationMessageService,
   public loading:LoadingService
  ) {
    this.subscription.push(
      this.notifyService.subjectMessage.subscribe((notify) => {
        this.messageService.add(notify);
      })
    );
  }
  subscription: Subscription[] = [];
  form = this.fb!.group({
    userName: [null, [Validators.required, Validators.pattern(CHARACTERS)]],
    password: [null, [Validators.required, Validators.maxLength(6)]],
  });

  ngOnInit(): void {
    
  }
  onLogin() {
    this.loading.start();
    if (this.form.invalid) {
      return validateAllFormFields(this.form);

    } else {
      const data = cleanDataForm(this.form);
      this.loginService.login(data).pipe(finalize(()=>this.loading.complete())).subscribe({
        next: (data) => {
          if (data.code === 400) {
            this.notifyService?.error('Tài khoản hoặc mật khẩu chưa chính xác');
          } else {
            this.router.navigate(['/admin/dashboard']);
          }
        },
        error: () => {
          this.notifyService!.error('Có lỗi xảy ra');
        },
      });
    }
  }
  ngOnDestroy(): void {
    this.subscription.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
