import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@cores/services/login.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
  fullName: string = '';
  constructor(private router: Router,private loginService:LoginService) { }
  hovaten: any;
  ngOnInit() {
    // const interval = setInterval(() => {
    //   const user = this.sessionService.getSessionData(SessionKey.UserProfile);
    //   if (user) {
    //     this.fullName = `${user.firstName} ${user.lastName}`;
    //     clearInterval(interval);
    //   }
    // });
    const admin = JSON.parse(sessionStorage.getItem('admin') || '{}');
    this.hovaten = admin.fullName;
    // if (admin !== null) {
    //   admin = parseInt(admin);
    // }
    console.log(
      admin);
    
  }
  logout() {//chế thêm
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }
}
