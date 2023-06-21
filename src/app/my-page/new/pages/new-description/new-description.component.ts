import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '@shared/components';
import { NewModel } from '../../models/new.model';
import { NewService } from '../../service/new.service';
import { HomeService } from 'src/app/my-page/services/home.service';

@Component({
  selector: 'app-new-description',
  templateUrl: './new-description.component.html',
  styleUrls: ['./new-description.component.scss'],
})
export class NewDescriptionComponent extends BaseComponent implements OnInit {
  id?: any;

  constructor(inject: Injector, private service: HomeService) {
    super(inject);
  }
  model?: NewModel = {};
  viewNewId(id: string) {
    // if ( this.loadingService.loading) {
    //   return;
    // }
    this.loadingService.start();

    this.service.findByNew(id).subscribe({
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
  ngOnInit(): void {
    this.id = this.route?.snapshot.paramMap.get('newId');
    this.viewNewId(this.id);
  }
}
