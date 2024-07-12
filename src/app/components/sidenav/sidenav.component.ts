import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  title = 'Siraaji_Hotel';
  myDate = Date.now();
  ripple = true; // Initialize the 'ripple' property

  menus: any[] = [
    {
      name: 'Sales',
      state: '/sales',
      type: 'link',
      icon: 'sales_icon'
    },
    {
      name: 'Sale Details',
      state: '/detail',
      type: 'link',
      icon: 'sale_details_icon'
    },
    {
      name: 'Dashboard',
      state: '/dashboard',
      type: 'link',
      icon: 'dashboard_icon'
    },
    {
      name: 'Reports',
      state: '',
      type: 'sub',
      icon: 'reports_icon',
      children: [
        {
          name: 'Sales Report',
          state: '/reports/sales',
          type: 'link'
        },
        {
          name: 'Product Report',
          state: '/reports/products',
          type: 'link'
        }
      ]
    }
  ];

  name: any;
  username: any;

  // Define the isHandset property for responsive behavior
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.username = localStorage.getItem('username');
    console.log(this.name);
    console.log(this.username);
  }

  // Define the 'buildRoute' function here
  buildRoute(states: string[]): string {
    let route = '';
    states.forEach(item => {
      if (item && item.trim()) {
        route += '/' + item.replace(/^\/+|\/+$/g, '');
      }
    });
    return route;
  }

  // Add this method for responsive sidenav behavior
  setSidenavMode(sidenav: MatSidenav): void {
    this.isHandset$.subscribe((isHandset) => {
      console.log('Is Handset:', isHandset);
      if (isHandset) {
        sidenav.mode = 'over';
        sidenav.close();
      } else {
        sidenav.mode = 'side';
        sidenav.open();
      }
    });    
  }
}
