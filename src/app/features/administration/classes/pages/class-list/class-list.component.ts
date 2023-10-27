import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseTableComponent } from '@shared/components';
import { ClassActionComponent } from '../../components';
import { ClassModel } from '../../models/class.model';
import { ClassService } from '../../services/class.service';
import { Observable, debounceTime, distinctUntilChanged, interval, map, mergeMap, observable, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss'],
})
export class ClassListComponent extends BaseTableComponent<ClassModel> implements OnInit {
  searchInput = new FormControl();
  searchResults: any[] = [];
  searchResults1: any[] = [];
  searchResults2: any[] = [];
  constructor(inject: Injector, service: ClassService, private classService: ClassService) {
    super(inject, service);
  }
  override params: ClassModel = {
    className: '',
    teacherId: '',
    status: '',
    searchName: '',
  };
  ngOnInit(): void {
    this.getData();
    if (!this.stateData) {
      this.stateData = {
        listStatus: [],
      };
    }
  }
  override mapState(): void {
    this.stateData?.listStatus.unshift({ name: 'Tất cả', value: '' });
    this.stateData?.listTeacher.unshift({ teacherName: 'Tất cả', teacherId: '' });
  }
  override initConfigAction(): void {
    this.configAction = {
      title: 'Lớp học',
      component: ClassActionComponent,
    };
  }
  onReset() {
    this.params = {
      className: '',
      teacherId: '',
      status: '',
      searchName: '',
    };
    this.search();
  }

  getData() {
    // this.searchInput.valueChanges.pipe(debounceTime(1000)).subscribe((results: any) => {
    //   this.classService.getSwitchMap(results).subscribe({
    //     next: (value: any) => {
    //       console.log('Map: ', value);
    //       this.searchResults = value.data;
    //     },
    //   });
    // });
    this.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((query) => this.add(query))
      )
      .subscribe({
        next: (value: any) => {

          this.searchResults1.push(value);
          console.log('switchMap: ', this.searchResults1);

        },
      });
    this.searchInput.valueChanges
      .pipe(
        debounceTime(500),
        mergeMap((query) => this.add(query))
      )
      .subscribe({
        next: (value: any) => {

          this.searchResults2.push(value);
          console.log('mergeMap: ', this.searchResults2);

        },
      });
  }
  add(data: string) {
    let my = new Observable<string>((obs) => {
      setTimeout(() => {
        obs.next(data);
      }, 2000);
    });
    return my;
  }
}
