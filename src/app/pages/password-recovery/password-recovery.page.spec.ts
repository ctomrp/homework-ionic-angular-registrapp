import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginService } from 'src/app/services/login.service';
import { MessageComponent } from 'src/app/components/message/message.component';
import { PasswordRecoveryPage } from './password-recovery.page';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('PasswordRecoveryPage', () => {
  let component: PasswordRecoveryPage;
  let fixture: ComponentFixture<PasswordRecoveryPage>;
  let routerSpy: jasmine.SpyObj<Router>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;

  beforeEach(() => {
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const loginServiceMock = jasmine.createSpyObj('LoginService', [
      'recoverPassword',
    ]);

    TestBed.configureTestingModule({
      declarations: [PasswordRecoveryPage],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: LoginService, useValue: loginServiceMock },
      ],
    });

    fixture = TestBed.createComponent(PasswordRecoveryPage);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    loginServiceSpy = TestBed.inject(
      LoginService
    ) as jasmine.SpyObj<LoginService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form and isSubmitted on ionViewWillEnter', () => {
    component.passwordRecoveryForm.setValue({
      id: null,
      email: 'cr.rico@duocuc.cl',
    });
    component.isSubmitted = true;

    component.ionViewWillEnter();

    expect(component.passwordRecoveryForm.value).toEqual({
      email: null,
      id: null,
    });
    expect(component.isSubmitted).toBe(false);
  });

  it('should call recoverPassword and navigate to login on valid form submission', async () => {
    const email = 'cr.rico@duocuc.cl';
    loginServiceSpy.recoverPassword.and.resolveTo(null);
    component.messageComponent = {
      header: '',
      message: '',
      setOpen: jasmine.createSpy(),
    } as unknown as MessageComponent;

    component.passwordRecoveryForm.patchValue({ email });
    await component.doEnter();

    expect(loginServiceSpy.recoverPassword).toHaveBeenCalledWith(email);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should show an error message on invalid form submission', async () => {
    component.passwordRecoveryForm.setErrors({ someError: true });
    component.messageComponent = {
      header: '',
      message: '',
      setOpen: jasmine.createSpy(),
    } as unknown as MessageComponent;

    await component.doEnter();

    expect(component.messageComponent.setOpen).toHaveBeenCalledWith(true);
  });

  it('should show an error message on recoverPassword error', async () => {
    const errorMessage = 'Error message from recoverPassword';
    loginServiceSpy.recoverPassword.and.resolveTo(errorMessage);
    component.passwordRecoveryForm.patchValue({ email: 'cr.rico@duocuc.cl' });

    component.messageComponent = {
      header: '',
      message: '',
      setOpen: jasmine.createSpy(),
    } as unknown as MessageComponent;

    await component.doEnter();

    expect(component.messageComponent.header).toBe('Error');
    expect(component.messageComponent.message).toBe(errorMessage);
    expect(component.messageComponent.setOpen).toHaveBeenCalledWith(true);
  });

  it('should handle unknown error during recoverPassword', async () => {
    loginServiceSpy.recoverPassword.and.rejectWith(new Error('Unknown error'));
    component.passwordRecoveryForm.patchValue({ email: 'cr.rico@duocuc.cl' });

    component.messageComponent = {
      header: '',
      message: '',
      setOpen: jasmine.createSpy(),
    } as unknown as MessageComponent;

    await component.doEnter();

    expect(component.messageComponent.header).toBe('Error');
    expect(component.messageComponent.message).toBe(
      'Ocurrió un error desconocido, por favor intente más tarde.'
    );
    expect(component.messageComponent.setOpen).toHaveBeenCalledWith(true);
  });
});
