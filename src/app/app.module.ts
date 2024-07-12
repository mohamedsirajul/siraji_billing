import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SalesComponent } from './components/sales/sales.component';
import { DetailsComponent } from './components/details/details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { MenuComponent } from './components/menu/menu.component';
// import { ReportsComponent } from './components/reports/reports.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
// import { AddProductBoxComponent } from './components/menu/add-product-box/add-product-box.component';
// import { DialogBoxComponent } from './components/menu/dialog-box/dialog-box.component';
// import { ProductsReportComponent } from './components/reports/products-report/products-report.component';
// import { SalesReportComponent } from './components/reports/sales-report/sales-report.component';
import { ClockComponent } from './components/sales/clock/clock.component';
import { TableComponent } from './components/sales/table/table.component';
import { RegisterComponent } from './components/sessions/register/register.component';
import { FullscreenComponent } from './components/sidenav/fullscreen/fullscreen.component';
import { UsersComponent } from './components/sidenav/users/users.component';
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsReportComponent } from './components/reportss/products-report/products-report.component';
import { SalesReportComponent } from './components/reportss/sales-report/sales-report.component';
import { QuantityComponent } from './components/sales/table/quantity/quantity.component';
import { MenuComponent } from './components/menu/menu.component';
import { AddProductBoxComponent } from './components/menu/add-product-box/add-product-box.component';
import { DialogBoxComponent } from './components/menu/dialog-box/dialog-box.component';


import { HttpClientModule } from '@angular/common/http';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HashLocationStrategy, LocationStrategy, NgFor } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { ToastrModule } from 'ngx-toastr';
import {MatRippleModule} from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SampleComponent } from './components/sample/sample.component';
import { LoginComponent } from './components/sessions/login/login.component';

// import { MatChipListbox } from '@angular/material-experimental/mdc-chips';




@NgModule({
  declarations: [
    AppComponent,
    SalesComponent,
    DetailsComponent,
    DashboardComponent,
    MenuComponent,
    SettingsComponent,
    SidenavComponent,
    AddProductBoxComponent,
    DialogBoxComponent,
    ProductsReportComponent,
    SalesReportComponent,
    ClockComponent,
    TableComponent,
    RegisterComponent,
    LoginComponent,
    FullscreenComponent,
    UsersComponent,
    AuthLayoutComponent,
    QuantityComponent,
    SampleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatPaginatorModule,
    NgFor,
    DragDropModule,
    MatMenuModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatChipsModule,
    MatRippleModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
        // MatChipListbox
    ToastrModule.forRoot()

  ],
  providers: [
    {provide: LocationStrategy,useClass:HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
