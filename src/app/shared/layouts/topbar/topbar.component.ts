import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@cores/services/session.service';
import { SessionKey } from '@cores/utils/enums';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
  fullName: string = '';
  constructor(private sessionService: SessionService, private service: AuthService,private router: Router) { }
  admin: any = [];
  hovaten: any;
  ngOnInit() {
    // const interval = setInterval(() => {
    //   const user = this.sessionService.getSessionData(SessionKey.UserProfile);
    //   if (user) {
    //     this.fullName = `${user.firstName} ${user.lastName}`;
    //     clearInterval(interval);
    //   }
    // });
    this.admin = JSON.parse(localStorage.getItem('admin') || '{}');
    this.hovaten = this.admin.fullName;
    if (this.admin != null) {
      this.admin = parseInt(this.admin);
    }
  }
  logout() {//chế thêm
    if (this.admin!= 0) {
      this.service.logout();
    
      setTimeout(() => {
        this.router.navigateByUrl('/mb-ageas/login');
      }, 0);
    }
  }
}
