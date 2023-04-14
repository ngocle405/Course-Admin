import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseActionComponent } from '@shared/components';
import { RegisterService } from '../../service/register.service';
import { cleanDataForm } from '@cores/utils/common-functions';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent extends BaseActionComponent implements OnInit {

  constructor(inject:Injector,service:RegisterService) {
    super(inject,service);
  }
   form = this.fb!.group({
    studentName :['',[Validators.required]],
    status:[true,Validators.required]
  })
  ngOnInit(): void {
    this.form.patchValue(this.data);
  }
  onChangeStatus(data:any){
    this.service.updateStatus(this.data.id, data).subscribe({
      next: () => {
        this.refDialog.close(true);
        this.messageService!.success('Cập nhật trạng thái thành công');
      },
      error: (err) => {

        this.messageService!.error("có lỗi xảy ra");
      },
    });
  }
  save() {
    const data = cleanDataForm(this.form);
    if (this.form?.status === 'VALID') {
      this.messageService?.confirm().subscribe((isConfirm) => {
        if (isConfirm) {
         this.onChangeStatus(data);
        }
      });
    } 
  }

}
