import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BaseTableComponent } from '@shared/components';
import { RegisterActionComponent } from '../../components';
import { ChangeStatusComponent } from '../../components/change-status/change-status.component';
import { RegisterModel } from '../../models/register.model';
import { RegisterService } from '../../service/register.service';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.scss'],
})
export class RegisterListComponent extends BaseTableComponent<RegisterModel> implements OnInit {
  constructor(inject: Injector, service: RegisterService) {
    super(inject, service);
  }

  status: any;
  override params: RegisterModel = {
    registerId: '',
    note: '',
    name: '',
    phone: '',
    email: '',
    companyAddress: '',
    courseId: '',
    level: '',
    know: '',
    status: '',
  };
  override mapState(): void {
    this.stateData?.listAddressCompany.unshift({ name: 'Tất cả', value: '' });
    this.stateData?.listStatus.unshift({ name: 'Tất cả', value: '' });
  }
  viewStatus(id: string) {
    if (this.loadingService.loading || !this.configAction?.component) {
      return;
    }

    this.loadingService.start();
    this.service.findById(id).subscribe({
      next: (data) => {
        const dialog = this.dialogService?.open(ChangeStatusComponent, {
          showHeader: false,
          width: this.configAction!.dialog?.width || '40%',
          data: {
            model: data,
            baseId: id,
            state: this.propData,
          },
        });
        dialog?.onClose.subscribe({
          next: (isSuccess) => {
            if (isSuccess) {
              this.search();
            }
          },
        });
        this.loadingService.complete();
      },
      error: (e) => {
        this.loadingService.complete();
        this.messageService?.error('Có lỗi xảy ra, vui lòng thử lại sau');
      },
    });
  }
  override initConfigAction(): void {
    this.configAction = {
      title: '',
      component: RegisterActionComponent,
    };
  }
  onReset() {
    setTimeout(() => {
      this.params = {
        registerId: '',
        note: '',
        name: '',
        phone: '',
        email: '',
        companyAddress: '',
        courseId: '',
        level: '',
        know: '',
      };
      this.search();
    }, 0);
  }
  ngOnInit(): void {}
  onChangeStatus(id: string, data: any) {
    this.service.updateStatus(`updateStatus`, id, { status: data }).subscribe({
      next: () => {
        this.messageService!.success('Cập nhật trạng thái thành công');
        this.search();
      },
      error: (err) => {
        this.messageService!.error(err.error.message);
      },
    });
  }
}
