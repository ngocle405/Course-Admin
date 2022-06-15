import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { map } from 'lodash';
import { DataTable } from '../models/data-table.model';

export function cleanDataForm(formGroup: FormGroup) {
  const form = formGroup;
  Object.keys(form.controls).forEach((field) => {
    const control = form.get(field);
    if (control instanceof FormControl && typeof control.value === 'string') {
      control.setValue(control?.value?.trim(), { emitEvent: false });
    } else if (control instanceof FormGroup) {
      cleanDataForm(control);
    } else if (control instanceof FormArray) {
      for (const form of control.controls) {
        cleanDataForm(form as FormGroup);
      }
    }
  });
  return form.getRawValue();
}

export function validateAllFormFields(formGroup?: FormGroup) {
  if (!formGroup) {
    return;
  }
  Object.keys(formGroup.controls).forEach((field) => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
      control.markAsDirty({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      validateAllFormFields(control);
    } else if (control instanceof FormArray) {
      for (const form of control.controls) {
        validateAllFormFields(form as FormGroup);
      }
    }
  });
}

export function mapDataTable(data: any, params: any) {
  return <DataTable<any>>{
    content: data?.data || [],
    currentPage: params?.pageIndex || 1,
    size: params?.pageSize || 10,
    totalElements: data?.totalRecords || 0,
    totalPages: data.totalPages,
   
  };
}

export function getNodeMenuByUrl(tree: any, value: string): any {
  let result = null;
  if (value === tree.routerLink) {
    return tree;
  } else if (tree.children) {
    for (let index = 0; index < tree.children.length; index++) {
      result = getNodeMenuByUrl(tree.children[index], value);
      if (result) {
        break;
      }
    }
  }
  return result;
}
