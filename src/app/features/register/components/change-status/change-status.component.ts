import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseActionComponent } from '@shared/components';
import { RegisterService } from '../../service/register.service';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.scss']
})
export class ChangeStatusComponent extends BaseActionComponent implements OnInit {

  constructor(inject:Injector,service:RegisterService) {
    super(inject,service);
  }
  override form = this.fb!.group({
    studentName :['',[Validators.required]],
    status:[true,Validators.required]
  })
  ngOnInit(): void {
    this.form.patchValue(this.data);
  }
  onChangeStatus(data:any){
    this.service.updateStatus(`updateStatus`,this.baseId, data).subscribe({
      next: () => {
        this.refDialog.close(true);
        this.messageService!.success('Cập nhật trạng thái thành công');
      },
      error: (err) => {

        this.messageService!.error("có lỗi xảy ra");
      },
    });
  }
  override save() {
    const data = this.getDataForm();
    if (this.form?.status === 'VALID') {
      this.messageService?.confirm().subscribe((isConfirm) => {
        if (isConfirm) {
         this.onChangeStatus(data);
        }
      });
    } 
  }

}
