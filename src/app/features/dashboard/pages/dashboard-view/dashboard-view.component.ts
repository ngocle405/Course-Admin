import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
})
export class DashboardViewComponent implements OnInit {
  constructor() {}
  obsData: number = 0;
  obsData2: number = 0;
  subData: number = 0;
  subData2: number = 0;

  ngOnInit(): void {}
  getObs() {
    //Observable mặc định không hỗ trợ multicasting, điều này có nghĩa là mỗi subscribe sẽ tạo ra một luồng dữ liệu mới. 
    //Để multicasting, bạn phải sử dụng các operator như share(), publish(), hoặc multicast().
    const myObs = new Observable((observer) => {
      observer.next(Math.floor(Math.random() * 99) + 1);
    });
    myObs.subscribe((item: any) => {
      this.obsData = item;
      this.obsData2 = item;
    });
    myObs.subscribe((item: any) => {
      this.obsData2 = item;
    });
  }
  getSub() {
    //Subject hỗ trợ multicasting tức là nó có thể gửi dữ liệu đến nhiều subscriber.
    // Bất kỳ subscriber nào đăng ký sau khi subject đã phát ra giá trị cũng sẽ nhận được giá trị mới từ thời điểm đó.
    //vd
    const mySubject = new Subject();

    mySubject.subscribe((data: any) => {
      this.subData = data;
    });
    mySubject.subscribe((data: any) => {
      this.subData2 = data;
    });
    mySubject.next(Math.floor(Math.random() * 99) + 1);

  }
}
