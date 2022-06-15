export interface EnterpriseModel {
  vnName: string;
  enName: string;
  abbreviation: string;
  code: string;
  tax: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  businessProfession: string;
  legalRepresentativeCode: string;
  bankName1: string;
  bankAccount1: string;
  bankOwner1: string;
  bankName2: string;
  bankAccount2: string;
  bankOwner2: string;
  personnelSize: string;
  registrationNumber: string;
  registrationDate: string | Date;
  foundDate: string | Date;
  businessRegistrationDTOS: [''];
  workLocationDTOS: [''];
}

export interface EmployeeModel {
  code: string;
  name: string;
}
