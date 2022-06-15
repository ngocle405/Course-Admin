import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationMessageService } from '@cores/services/message.service';
import { BaseActionComponent, BaseComponent } from '@shared/components';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  
 
  constructor(private inject:Injector,private router: Router,private services: AuthService, private fb: FormBuilder,  private readonly messageService: MessageService,) {
   
  }
  form !: FormGroup ;
 
  ngOnInit(): void {
    this.form = this.fb.group({
      userName: this.fb.control(''),
      password: this.fb.control(''),
    });
  }
  //  save() {
  //   const data = this.getDataForm();
  //   if (this.form?.status === 'VALID') {
  //     this.messageService?.confirm().subscribe((isConfirm) => {
  //       if (isConfirm) {
  //         this.onLogin(data)
  //       }
  //     });
  //   }
  // }
  onLogin() {
    let login = {
      userName : this.form.get('userName')?.value ,
      password: this.form.get('password') ?.value 
    };
    this.services.login(login).subscribe({
      next: (data) => {
        
        if(data != null){
         
          this.router.navigateByUrl('mb-ageas/dashboard');
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Thông báo', detail: data.useMsg });
        }
      },
      error: (err) => {
        console.log(err);
        // this.messageService!.error(err.error.message);
      },
    });
  }

}
