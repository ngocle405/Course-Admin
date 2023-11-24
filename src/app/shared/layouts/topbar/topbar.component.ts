import { Component, OnInit,Injector } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@cores/services/login.service';
import { NotificationMessageService } from '@cores/services/message.service';
import { getFromLocalStorage } from '@cores/utils/common-functions';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
  fullName: string = '';
  constructor(private router: Router,private loginService:LoginService) { }
  hovaten: string ='';
  ngOnInit() {
    // const interval = setInterval(() => {
    //   const user = this.sessionService.getSessionData(SessionKey.UserProfile);
    //   if (user) {
    //     this.fullName = `${user.firstName} ${user.lastName}`;
    //     clearInterval(interval);
    //   }
    // });
    const admin:any = getFromLocalStorage('user');
    this.hovaten = admin.user;   
    
  }
  logout() {//chế thêm
    this.loginService.logout();
  }
}
