import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@cores/services/login.service';
import { NotificationMessageService } from '@cores/services/message.service';
import { cleanDataForm, validateAllFormFields } from '@cores/utils/common-functions';
import { CHARACTERS } from '@cores/utils/constants';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit,OnDestroy {
  loading = false;
  showPass = true;
  showPassword() {
    this.showPass = !this.showPass;
  }
  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
   private notifyService:NotificationMessageService
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

  ngOnInit(): void {}
  onLogin() {
    this.loading = true;
    if (this.form.invalid) {
      this.loading=false;
      return validateAllFormFields(this.form);

    } else {
      const data = cleanDataForm(this.form);
      this.loginService.login(data).subscribe({
        next: (data) => {
          if (data.code === 400) {
            this.notifyService?.error('Tài khoản hoặc mật khẩu chưa chính xác');
            this.loading = false;
          } else {
            this.router.navigate(['/admin/dashboard']).then(() => (this.loading = false));
          }
        },
        error: () => {
          this.notifyService!.error('Có lỗi xảy ra');
          this.loading = false;
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
