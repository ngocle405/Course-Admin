import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { v4 as uuIdv4 } from 'uuid';
import * as _ from 'lodash';
import { StreamDataService } from 'src/app/core/services/stream-data.service';
import { getNodeMenuByUrl } from 'src/app/core/utils/common-functions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('toggleMenu', [
      transition(':enter', [style({ visibility: 'visible', height: 0 }), animate(`${150}ms ease-in`)]),
      transition(':leave', [animate(`${150}ms ease-out`, style({ visibility: 'hidden', height: 0 }))]),
    ]),
  ],
})
export class AppMenuComponent implements OnInit {
  constructor(private router: Router, private streamData: StreamDataService) {
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationEnd) {
        const item = getNodeMenuByUrl({ children: this.items }, this.router.url);
        //  this.activeMenuItem(item);//tạm thời coment
      }
    });
  }

  @Output() staticMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  classMenu = 'layout-sidebar';
  items: any = [];
  isLock = false;

  ngOnInit() {
    this.items = [
      {
        id: uuIdv4(),
        label: 'Dashboard',
        icon: 'pi-home',
        routerLink: '/admin/dashboard',
        active: false,
        path: null,
      },
      {
        id: uuIdv4(),
        label: 'Đăng ký',
        icon: 'pi-user-plus',
        routerLink: '/admin/register',
        active: false,
        path: null,
      },
      {
        id: uuIdv4(),
        label: 'Hệ thống',
        icon: 'pi-cog',
        routerLink: '/admin/config-system',
        active: false,
        path: null,
      },
      {
        id: uuIdv4(),
        label: 'Nhân sự',
        icon: 'pi-star',
        active: false,
        path: null,
        children: [
          {
            id: uuIdv4(),
            path: '[3]',
            label: 'Quản lý giáo viên',
            icon: 'pi-sign-in',
            routerLink: '/admin/employee/teacher',
            active: false,
          },
          {
            id: uuIdv4(),
            path: '[3]',
            label: 'Quản lý học viên',
            icon: 'pi-sign-in',
            routerLink: '/admin/employee/student',
            active: false,
          },
        ],
      },

    

      {
        id: uuIdv4(),
        label: 'Administration',
        icon: 'pi-box',
        active: false,
        path: null,
        children: [
          {
            id: uuIdv4(),
            path: '[4]',
            label: 'Quản lý lớp học',
            icon: 'pi-sign-in',
            routerLink: '/admin/administration/class',
            active: false,
          },
          {
            id: uuIdv4(),
            path: '[4]',
            label: 'Quản lý loại khóa học',
            icon: 'pi-sign-in',
            routerLink: '/admin/administration/course-category/',
            active: false,
          },
          {
            id: uuIdv4(),
            path: '[4]',
            label: 'Quản lý khóa học',
            icon: 'pi-sign-in',
            routerLink: '/admin/administration/course',
            active: false,
          },
          {
            id: uuIdv4(),
            path: '[4]',
            label: 'Quản lý loại tin tức',
            icon: 'pi-sign-in',
            routerLink: '/admin/administration/newcategory',
            active: false,
          },
          {
            id: uuIdv4(),
            path: '[4]',
            label: 'Quản lý tin tức',
            icon: 'pi-sign-in',
            routerLink: '/admin/administration/new',
            active: false,
          },
        ],
      },
      {
        id: uuIdv4(),
        label: 'Thanh toán học phí',
        icon: 'pi-apple',
        routerLink: '/admin/payment',
        active: false,
        path: null,
      },
    ];
    this.streamData.passData('menu', this.items);
  }

  mouseEnterMenu() {
    this.classMenu = 'layout-sidebar layout-sidebar-active';
  }

  mouseLeaveMenu() {
    this.classMenu = 'layout-sidebar';
  }

  activeMenuItem(itemActive: any) {
    const isActive: boolean = itemActive.active;
    _.get(this.items, `${itemActive.path}.children`, this.items).forEach((item: any) => {
      item.active = false;
    });
    itemActive.active = !isActive;
  }

  isShowClass(url: string) {
    return this.router.url.includes(url);
  }

  onStaticMenu() {
    this.isLock = !this.isLock;
    this.staticMenu.emit(this.isLock);
  }
}
