import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductBoxComponent } from './add-product-box.component';

describe('AddProductBoxComponent', () => {
  let component: AddProductBoxComponent;
  let fixture: ComponentFixture<AddProductBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
