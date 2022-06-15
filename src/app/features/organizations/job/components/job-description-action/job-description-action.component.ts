import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { BaseActionComponent } from '@shared/components';
import { cleanDataForm, validateAllFormFields } from 'src/app/core/utils/common-functions';
import { ScreenType } from 'src/app/core/utils/enums';
import { CommonModel, StateJobDescription } from '../../models/job-description.model';
import { CommonJobService } from '../../services/common-job.service';
import { JobDescriptionService } from '../../services/job-description.service';

@Component({
  selector: 'app-job-description-action',
  templateUrl: './job-description-action.component.html',
  styleUrls: ['./job-description-action.component.scss'],
})
export class JobDescriptionActionComponent extends BaseActionComponent implements OnInit {
  constructor(injector: Injector, service: JobDescriptionService, private commonJobService: CommonJobService) {
    super(injector, service);
  }

  formListResponsibility = new FormArray([]);
  formListCapacityGroup = new FormArray([]);
  uploadedFiles: any[] = [];
  listCapacityGroup = [
    {
      listAbilities: [] as CommonModel[],
      listLevel: [] as CommonModel[],
      description: '',
    },
  ];
  list = { abilityCode: '', levelCode: '' };

  override state!: StateJobDescription;
  override form = this.fb!.group({
    id: [''],
    jobId: [''],
    descriptionVersion: ['', Validators.required],
    directlyReport: [''],
    indirectReport: [''],
    rdReport: [''],
    riReport: [''],
    function: [''],
    power: [''],
    age: [''],
    experience: [''],
    educationLevel: [''],
    note: [''],
    startDate: [''],
    endDate: [''],
    majorDTOS: [''],
    status: true,
  });

  addNewFormResponsibility() {
    const form = this.fb!.group({
      waFrequency: ['', Validators.required],
      outputResult: ['', Validators.required],
    });
    this.formListResponsibility.push(form);
  }

  addNewFormCapacityGroup() {
    const form = this.fb!.group({
      capacityGroupCode: [''],
      abilityCode: [''],
      levelCode: [''],
      description: [''],
    });
    const data: any = {
      listAbilities: [] as CommonModel,
      listLevel: [] as CommonModel,
      description: '',
    };
    this.listCapacityGroup.push(data);
    this.formListCapacityGroup.push(form);
  }

  ngOnInit(): void {
    if (this.screenType === ScreenType.Detail) {
      this.form.disable();
    }
    if (this.screenType === ScreenType.Create) {
      this.form.controls['jobId'].setValue(+this.configDialog.data?.jobId);
    }

    if (this.data && this.screenType !== ScreenType.Create) {
      let major: any[] = [];
      let i = 0;
      this.form.patchValue(this.data);
      this.form.controls['jobId'].setValue(+this.data?.jobDTO.id);
      this.form.controls['startDate'].setValue(new Date(this.data.startDate));
      this.form.controls['endDate'].setValue(new Date(this.data.endDate));
      this.data.majorDTOS?.forEach((item: any) => {
        major.push(item.majorCode);
      });
      this.form.controls['majorDTOS'].setValue(major);

      this.data.capacityDTOS?.forEach((item: any) => {
        this.commonJobService.getAbilitiesByCapacity(item.groupCode).subscribe({
          next: (res: CommonModel) => {
            for (let ability of res as CommonModel[]) {
              this.listCapacityGroup[i]?.listAbilities.push(ability);
              if (ability.code == item.abilityCode) {
                ability.levels?.forEach((level: CommonModel, index: number) => {
                  this.listCapacityGroup[i]?.listLevel.push(level);
                });
              }
            }
          },
          complete: () => {
            const formChildren = this.fb!.group({
              capacityGroupCode: [item.groupCode],
              abilityCode: [item.abilityCode],
              levelCode: [item.levelCode],
              description: [item.levelDescription],
            });
            if (this.screenType === ScreenType.Detail) {
              formChildren.disable();
            }
            const data: any = {
              listAbilities: [] as CommonModel,
              listLevel: [] as CommonModel,
              description: '',
            };
            this.listCapacityGroup.push(data);
            this.formListCapacityGroup.push(formChildren);
            i++;
          },
          error: () => {
            this.messageService!.error('Có lỗi');
          },
        });
      });

      this.data.responsibilityDTOS?.forEach((item: CommonModel) => {
        const formChildren = this.fb!.group({
          waFrequency: ['', Validators.required],
          outputResult: ['', Validators.required],
        });
        if (this.screenType === ScreenType.Detail) {
          formChildren.disable();
        }
        formChildren.patchValue(item);
        this.formListResponsibility.push(formChildren);
      });
    }
  }

  onChangeDropdown(event: any, name: string, i: number) {
    let code = event.value;
    if (name === 'capacityGroupCode') {
      this.listCapacityGroup[i].listAbilities = [];
      this.listCapacityGroup[i].listLevel = [];
      ((this.formListCapacityGroup as FormArray).at(i) as FormGroup).controls['description'].setValue('');
      this.commonJobService.getAbilitiesByCapacity(code).subscribe({
        next: (res: CommonModel) => {
          for (let item of res as CommonModel[]) {
            this.listCapacityGroup[i].listAbilities.push(item);
          }
        },
        error: () => {
          this.messageService!.error('Có lỗi');
        },
      });
    } else if (name === 'abilityCode') {
      this.list.abilityCode = code;
      this.listCapacityGroup[i].listLevel = [];
      ((this.formListCapacityGroup as FormArray).at(i) as FormGroup).controls['description'].setValue('');
      this.commonJobService.getLevelByAbility(code).subscribe({
        next: (res: CommonModel) => {
          for (let item of res as CommonModel[]) {
            this.listCapacityGroup[i].listLevel.push(item);
          }
        },
        error: () => {
          this.messageService!.error('Có lỗi');
        },
      });
    } else if (name === 'levelCode') {
      this.list.levelCode = code;
      this.commonJobService.getDescription({ list: [this.list] }).subscribe({
        next: (res) => {
          ((this.formListCapacityGroup as FormArray).at(i) as FormGroup).controls['description'].setValue(
            res[0]?.levelDescription
          );
        },
        error: () => {
          this.messageService!.error('Có lỗi');
        },
      });
    }
  }

  override save() {
    let isValid = true;
    let dataListResponsibility: any[] = [];
    let dataListCapacityGroup: any[] = [];
    let dataListMajor: any[] = [];
    for (const item of this.form.controls['majorDTOS'].value) {
      let major = {
        majorCode: item,
      };
      dataListMajor.push(major);
    }
    for (const item of this.formListResponsibility.controls) {
      if (isValid && item.status === 'INVALID') {
        isValid = false;
      }
      let data = cleanDataForm(item as FormGroup);
      dataListResponsibility.push(data);
      validateAllFormFields(item as FormGroup);
    }
    for (const item of this.formListCapacityGroup.controls) {
      if (isValid && item.status === 'INVALID') {
        isValid = false;
      }
      let data = cleanDataForm(item as FormGroup);
      dataListCapacityGroup.push(data);
      validateAllFormFields(item as FormGroup);
    }
    const data = this.getDataForm();
    data.responsibilityDTOS = dataListResponsibility;
    data.capacityGroupDTOS = dataListCapacityGroup;
    data.majorDTOS = dataListMajor;
    console.log(data);
    if (this.form?.status === 'VALID' && isValid) {
      this.messageService?.confirm().subscribe((isConfirm) => {
        if (isConfirm) {
          if (this.screenType === ScreenType.Create) {
            this.create(data);
          } else {
            this.update(data);
          }
        }
      });
    } else {
      validateAllFormFields(this.form);
    }
  }

  deleteItemResponsibility(index: number) {
    this.formListResponsibility.removeAt(index);
  }

  deleteItemCapacityGroup(index: number) {
    this.listCapacityGroup.splice(index, 1);
    this.formListCapacityGroup.removeAt(index);
  }

  // onUpload(event: any) {
  //   for (let file of event.files) {
  //     this.uploadedFiles.push(file);
  //   }
  // }
}
