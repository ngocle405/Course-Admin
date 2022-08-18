import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import * as moment from 'moment';
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
// clear data
export function cleanDataTable(data: any) {
  Object.keys(data).forEach((key) => {
    if (_.isString(data[key])) {
      data[key] = _.trim(data[key]);
    } else if (
      _.isNull(data[key]) ||
      _.isUndefined(data[key]) ||
      ((_.isArray(data[key]) || _.isObject(data[key])) && _.isEmpty(data[key]))
    ) {
      delete data[key];
    } else if (_.isArray(data[key])) {
      const array = data[key];
      for (let index = 0; index < array?.length; index++) {
        if (_.isString(array[index])) {
          array[index] = _.trim(array[index]);
        } else if (_.isObject(array[index])) {
          cleanDataTable(array[index]);
        }
      }
    } else if (_.isObject(data[key]) && !(data[key] instanceof File)) {
      cleanDataTable(data[key]);
    }
  });
  return data;
}
export function dataURItoBlob(dataURI: any, type?: string) {
  const byteString = window.atob(dataURI);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([int8Array], { type: type || 'application/octet-stream' });
  return blob;
}
//format về kiểu datetime local
export function getValueDateTimeLocal(value: any): string | null {
  if (_.isDate(value)) {
    return moment(value).format(moment.HTML5_FMT.DATETIME_LOCAL);
  }
  return null;
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
//convert dữ liệu về dạng json
export function convertToJson(value: string) {
  if (_.isString(value) && _.isEmpty(value)) {
    return JSON.parse(value);
  }
  return null;
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
//set defaut date
@Pipe({
  name: 'datePipe',
})
export class getDateDefault {
  transform(value: any) {
    return moment(value).format('YYYY-MM-DD');
  }
}
