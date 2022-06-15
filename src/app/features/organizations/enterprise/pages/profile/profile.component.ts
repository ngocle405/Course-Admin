import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, forkJoin, map, of } from 'rxjs';
import { NotificationMessageService } from 'src/app/core/services/message.service';
import { cleanDataForm, validateAllFormFields } from 'src/app/core/utils/common-functions';
import * as moment from 'moment';
import { EmployeeModel, EnterpriseModel } from '../../models/enterprise.model';
import { EnterpriseService } from '../../services/enterprise.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private service: EnterpriseService,
    private messageService: NotificationMessageService
  ) {}

  data!: EnterpriseModel;
  employees: EmployeeModel[] = [];
  selectedEmployee!: EmployeeModel;
  loading: boolean = false;
  formBusinessRegistration = new FormArray([]);

  form = this.fb!.group({
    vnName: ['', Validators.required],
    enName: ['', Validators.required],
    abbreviation: ['', Validators.required],
    code: [''],
    tax: ['', Validators.required],
    address: [''],
    phone: [''],
    email: [''],
    website: [''],
    businessProfession: [''],
    legalRepresentativeCode: [''],
    bankName1: [''],
    bankAccount1: [''],
    bankOwner1: [''],
    bankName2: [''],
    bankAccount2: [''],
    bankOwner2: [''],
    personnelSize: [''],
    registrationNumber: [''],
    registrationDate: [''],
    foundDate: [''],
    businessRegistrationDTOS: [''],
    workLocationDTOS: [''],
  });

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.loading = true;
    forkJoin({
      enterprise: this.service.getData().pipe(catchError(() => of([]))),
      listEmployees: this.service.getEmployees().pipe(catchError(() => of([]))),
    })
      .pipe(
        map(
          (data) =>
            <any>{
              enterprise: data.enterprise,
              listEmployees: data.listEmployees,
            }
        )
      )
      .subscribe({
        next: (data: any) => {
          for (let item of data.listEmployees.models) {
            let employee = {
              code: item.code,
              name: item.firstName + ' ' + item.lastName,
            };
            this.employees.push(employee);
          }
          for (let item of data.enterprise.businessRegistrationDTOS) {
            const formChildren = this.fb!.group({
              orderNum: [item.orderNum, Validators.required],
              registrationDate: [new Date(item.registrationDate), Validators.required],
            });
            this.formBusinessRegistration.push(formChildren);
          }

          data.enterprise.registrationDate = new Date(data.enterprise.registrationDate);
          data.enterprise.foundDate = new Date(data.enterprise.foundDate);
          this.form.patchValue(data.enterprise);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.messageService?.error('Có lỗi xảy ra, vui lòng thử lại sau');
        },
      });
  }

  addNewFormBusinessRegistration() {
    const form = this.fb!.group({
      orderNum: [''],
      registrationDate: [''],
    });
    this.formBusinessRegistration.push(form);
  }

  save() {
    let isValid = true;
    let dataListBusinessRegistration: any[] = [];
    for (let item of this.formBusinessRegistration.controls) {
      if (isValid && item.status === 'INVALID') {
        isValid = false;
      }
      let data = cleanDataForm(item as FormGroup);
      data.registrationDate = moment(data.registrationDate).format('YYYY-MM-DD');
      dataListBusinessRegistration.push(data);
      validateAllFormFields(item as FormGroup);
    }
    let data = cleanDataForm(this.form);
    data.businessRegistrationDTOS = dataListBusinessRegistration;
    if (this.form?.status === 'VALID' && isValid) {
      this.messageService?.confirm().subscribe((isConfirm) => {
        if (isConfirm) {
          this.service.update(data).subscribe({
            next: (res) => {
              this.messageService?.success('Cập nhật thông tin thành công');
            },
            error: (err) => {
              this.messageService?.error(err.error.message);
            },
          });
        }
      });
    } else {
      validateAllFormFields(this.form);
    }
  }

  deleteItem(index: number) {
    this.formBusinessRegistration.removeAt(index);
  }
}
