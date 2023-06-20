import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { StreamDataService } from './core/services/stream-data.service';
import { APP_LOADING } from './core/utils/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  loaded = false;
  constructor(private primeNGConfig: PrimeNGConfig, private streamData: StreamDataService,private router: Router) {
    this.streamData.data$.subscribe((data) => {
      if (data.key === APP_LOADING) {
        this.loaded = true;
      }
    });
    this.router.events.subscribe(() => {
      this.checkRouting();
    });
  }

  ngOnInit() {
    this.primeNGConfig.ripple = true;
    this.checkRouting();
    
  }
  checkRouting() {
    if (this.router.url === '/login') {
      this.loaded = true;
    }
  }
}
