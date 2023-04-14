import { CommonModule, Location } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicModule } from 'ng-dynamic-component';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { AvatarModule } from 'primeng/avatar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { FileUploadModule } from 'primeng/fileupload';
import { components } from './components';
import { layouts } from './layouts';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { RadioButtonModule } from 'primeng/radiobutton';
import {ImageModule} from 'primeng/image';
import {EditorModule} from 'primeng/editor';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { TagModule } from 'primeng/tag';
import { ToUpperCaseDirective } from './directives/directives';
const COMPONENTS = [...components, ...layouts];
const PIPES: never[] = [];

const MODULES = [
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  DynamicModule,
  ButtonModule,
  CheckboxModule,
  InputTextModule,
  CalendarModule,
  AvatarModule,
  PanelMenuModule,
  InputMaskModule,
  InputNumberModule,
  DropdownModule,
  InputTextareaModule,
  MultiSelectModule,
  CalendarModule,
  ToolbarModule,
  TableModule,
  FileUploadModule,
  PaginatorModule,
  BreadcrumbModule,
  DynamicDialogModule,
  ConfirmPopupModule,
  ConfirmDialogModule,
  ToastModule,
  DialogModule,
  RadioButtonModule,
  InputSwitchModule,
  OrganizationChartModule,
  ImageModule,
EditorModule,
OverlayPanelModule,
TagModule
];
const DIRECTIVES = [
 ToUpperCaseDirective
];
@NgModule({
  imports: [CommonModule, ...MODULES],
  exports: [CommonModule, ...PIPES, ...COMPONENTS, ...DIRECTIVES, ...MODULES],
  declarations: [...COMPONENTS, ...PIPES, ...DIRECTIVES],
  providers: [Location],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
