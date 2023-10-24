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

  it('debe restablecer el formulario y se envía en ionViewWillEnter', () => {
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

  it('debe llamar a recoveryPassword y navegar para iniciar sesión en un envío de formulario válido', async () => {
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

  it('debería mostrar un mensaje de error al enviar un formulario no válido', async () => {
    component.passwordRecoveryForm.setErrors({ someError: true });
    component.messageComponent = {
      header: '',
      message: '',
      setOpen: jasmine.createSpy(),
    } as unknown as MessageComponent;

    await component.doEnter();

    expect(component.messageComponent.setOpen).toHaveBeenCalledWith(true);
  });

  it('debería mostrar un mensaje de error en el error de recuperación de contraseña', async () => {
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

  it('debería manejar un error desconocido durante la recuperación de contraseña', async () => {
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
