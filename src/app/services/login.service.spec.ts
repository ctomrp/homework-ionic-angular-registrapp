import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { TestBed } from '@angular/core/testing';

describe('LoginService', () => {
  let service: LoginService;
  const mockUser = {
    username: 'admin@admin.cl',
    password: 'admin1',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
      ],
      providers: [LoginService],
    });
    service = TestBed.inject(LoginService);
  });

  it('Deberia Iniciar Sesion', async () => {
    const result = await service.signIn(mockUser.username, mockUser.password);
    expect(result).toBeNull();
  });

  it('Deberia Cerrar Sesion', async () => {
    await service.signIn(mockUser.username, mockUser.password);
    const result = await service.signOut();
    expect(result).toBeNull();
  });

  it('Probando error de usuario/contraseña incorrecta', async () => {
    const mockUser = {
      username: 'usuario@incorrecto.com',
      password: 'contrasena_incorrecta',
    };

    spyOn(service.afAuth, 'signInWithEmailAndPassword').and.throwError(
      'Usuario y/o contraseña incorrecta.'
    );
    const userLoged = await service.signIn(
      mockUser.username,
      mockUser.password
    );
    expect(userLoged).toBe('Usuario y/o contraseña incorrecta.');
  });

  it('Deberia enviar correo de autenticacion', async () => {
    spyOn(service.afAuth, 'sendPasswordResetEmail').and.returnValue(
      Promise.resolve(null)
    );
    const result = await service.recoverPassword(mockUser.username);
    expect(result).toBeNull();
  });
});
