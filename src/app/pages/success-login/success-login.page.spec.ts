import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuccessLoginPage } from './success-login.page';

describe('SuccessLoginPage', () => {
  let component: SuccessLoginPage;
  let fixture: ComponentFixture<SuccessLoginPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuccessLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

