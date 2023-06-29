import { Component, Injector, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BaseComponent, BaseTableComponent } from '@shared/components';
import { MenuItem } from 'primeng/api';
import { CourseModel } from '../../models/course.model';
import { NgForm } from '@angular/forms';
import { HomeService } from 'src/app/my-page/services/home.service';
import { RegisterService } from 'src/app/features/register/service/register.service';
//declare var $: any;
@Component({
  selector: 'app-course-description',
  templateUrl: './course-description.component.html',
  styleUrls: ['./course-description.component.scss'],
})
export class CourseDescriptionComponent extends BaseComponent implements OnInit {
  constructor(inject: Injector, private service: HomeService,private registerService:RegisterService) {
    super(inject);
  }
  @ViewChild('form', { static: false }) form!: NgForm;
  @ViewChild('modal', { static: false }) modal!: ElementRef;
  items: MenuItem[] = [];
  stateData = {
    getCourseList: [],
    listAddressCompany: [],
    listLevel: [],
    listKnow: [],
  };
  home!: MenuItem;
  model: CourseModel = {};
  modelRegister = { studentName: null, phone: null, level: null, courseId: '', email: null }
  viewCourse(id: string) {
    // if ( this.loadingService.loading) {
    //   return;
    // }
    this.loadingService.start();

    this.service.getByCourseId(id).subscribe({
      next: (data: any) => {
        this.model = data;
        this.loadingService.complete();
      },
      error: (e) => {
        this.loadingService.complete();
        this.messageService?.error('Có lỗi xảy ra, vui lòng thử lại sau');
      },
    });
  }
 
  ngOnInit() {
    this.items = [{ label: 'Khóa học' }, { label: 'Chi tiết khóa học' }];
    this.home = { icon: 'pi pi-home', routerLink: '/' };
    const id = this.route?.snapshot.paramMap.get('courseId')!;
    this.viewCourse(id);
    this.registerService.getState().subscribe((data) => {
      this.stateData = data;
    });
  }
  save() {
    this.loadingService.start();
    this.modelRegister.courseId = this.model.courseId!;
    this.registerService.create(this.modelRegister).subscribe({
      next: () => {
        this.modal.nativeElement.querySelector('button.close').click();
        this.messageService?.success('Đăng ký thành công');
        this.form.resetForm();
        this.loadingService.complete();
      },
      error: (err) => {
        this.messageService?.error('Đăng ký không thành công');
        this.loadingService.complete();
      },
    })
    
   }
}
