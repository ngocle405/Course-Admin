import { environment } from 'src/environments/environment';

export const APP_LOADING = 'APP_LOADING';
export const SHOW_CONFIRM = 'SHOW_CONFIRM';
export const CHARACTERS='^[0-9a-zA-Z]+$';//không có dấu,và kí tự đặc biệt

export const VALIDATORS_MESSAGE: any = {
  required: 'Trường bắt buộc',
  minlength: 'Độ dài tối thiểu %d ký tự',
  maxlength: 'Độ dài tối đa %d ký tự',
  min: 'Giá trị tối thiểu là %d',
  max: 'Giá trị tối đa là %d',
  email: 'Sai định dạng email',
  phone: 'Sai định dạng SĐT',
  pattern:'Sai định dạng'
};

// nhóm đơn vị
export const CATEGORY_GROUP_UNIT_CODE = 'GUNIT';
