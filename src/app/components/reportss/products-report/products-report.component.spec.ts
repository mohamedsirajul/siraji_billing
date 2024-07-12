import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsReportComponent } from './products-report.component';

describe('ProductsReportComponent', () => {
  let component: ProductsReportComponent;
  let fixture: ComponentFixture<ProductsReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsReportComponent]
    });
    fixture = TestBed.createComponent(ProductsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
