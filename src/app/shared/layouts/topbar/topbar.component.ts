import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@cores/services/login.service';
import { getFromLocalStorage } from '@cores/utils/common-functions';
import { ClassService } from 'src/app/features/administration/classes/services/class.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
})
export class AppTopBarComponent implements OnInit, OnDestroy {
  fullName: string = '';
  constructor(private router: Router, private loginService: LoginService, private notifyService: ClassService) {}
  hovaten: string = '';
  countNotifications: number = 0;
  interval: number = 0;
  notifications: any = [];
  ngOnInit() {
    // const interval = setInterval(() => {
    //   const user = this.sessionService.getSessionData(SessionKey.UserProfile);
    //   if (user) {
    //     this.fullName = `${user.firstName} ${user.lastName}`;
    //     clearInterval(interval);
    //   }
    // });
    const admin: any = getFromLocalStorage('user');
    this.hovaten = admin.user;
    //  this.interval = setInterval(() => {
    //     this.notifyService.get().subscribe({
    //       next: (countNotify:any) => {
    //         this.countNotifications = countNotify.length || 0;
    //         console.log(this.countNotifications);

    //       },
    //     });
    //   }, 12000);
    this.interval= setInterval(()=>{
      this.notifyService.getNotification().subscribe((data: any) => {
        this.notifications.push(data); // Giả sử thông báo được trả về từ máy chủ là một đối tượng có thuộc tính message
      });
    },10000)
     
  }
  logout() {
    //chế thêm
    this.loginService.logout();
  }
  onShowNotify() {
    // this.notifyService.fetchNotifications(this.paramNotify).subscribe({
    //   next: (notifications) => {
    //     this.virtualNotifications = notifications || [];
    //   },
    // });
    const timer = setTimeout(() => {
      this.countNotifications = 0;
      const el = document.getElementsByClassName('op-notify').item(0) as HTMLElement;
      el!.style.top = '50px';
      el!.style.position = 'fixed';
      clearTimeout(timer);
    }, 10);
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
