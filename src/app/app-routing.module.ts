import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/sessions/register/register.component';
import { SalesComponent } from './components/sales/sales.component';
import { DetailsComponent } from './components/details/details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { ReportsComponent } from './components/reports/reports.component';
// import { SalesReportComponent } from './components/reports/sales-report/sales-report.component';
// import { ProductsReportComponent } from './components/reports/products-report/products-report.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { AuthGuard } from './services/auth.guard';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/sessions/login/login.component';
import { SalesReportComponent } from './components/reportss/sales-report/sales-report.component';
import { ProductsReportComponent } from './components/reportss/products-report/products-report.component';

const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   redirectTo: 'auth/login'
  // },
  // {
  //   path: 'auth',
  //   component: AuthLayoutComponent,
  //   children: [
  //     { path: '', pathMatch: 'full', redirectTo: 'sales' },
  //     { path: 'login', component: LoginComponent },
  //     { path: 'register', component: RegisterComponent },
  //   ],
  // },
  {
    path: '',
    // canActivate: [AuthGuard],
    component: SidenavComponent,
    children: [
      {
        path: 'sales',
        component: SalesComponent,
      },
      { path: 'detail', component: DetailsComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'reports/sales', component: SalesReportComponent },
      { path: 'reports/products', component: ProductsReportComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
  // Add other routes or redirect to a 404 page if necessary
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
