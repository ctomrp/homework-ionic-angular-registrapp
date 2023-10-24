import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule  } from '@angular/fire/compat/auth';

describe('LoginService', () => {
  let service: LoginService;
  
  const firebaseConfig = {
    apiKey: "AIzaSyDhSSoKtWhRvDcDtBCro56_WnNtqZW3Uoo",
    authDomain: "registrapp-e8be2.firebaseapp.com",
    projectId: "registrapp-e8be2",
    storageBucket: "registrapp-e8be2.appspot.com",
    messagingSenderId: "472829914675",
    appId: "1:472829914675:web:cbb4872a580593160cbd46"
  };

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule 
      ],
      providers: [LoginService],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(LoginService); // Inyecta el servicio
  });

  
  // it('Deberia Iniciar Sesion y Cerrar Sesion',async ()=>{
  //   const result = await service.signIn('admin@admin.cl','admin1')
  //   expect(result).toBeTrue;
  //   const result2 = await service.signOut();
  //   expect(result2).toBeNull;
  // });

  it('probando todas las funcionas',async()=>{

    //login
    const result = await service.signIn('admin@admin.cl','admin1')
    expect(result).toBeTrue;
    
    //logout
    const result2 = await service.signOut();
    expect(result2).toBeNull;

    //prueba de contraseña incorrecta
    spyOn(service.afAuth, 'signInWithEmailAndPassword').and.throwError('Usuario y/o contraseña incorrecta.');

//   // Intenta iniciar sesión con credenciales válidas
    const userLoged = await service.signIn('admin@admin.cl', 'Contrasena123123');

    // Debería devolver el mensaje de error de conexión
    expect(userLoged).toBe('Usuario y/o contraseña incorrecta.');

  });


//   it('Probando login exitoso', async () => {
//     // Intenta iniciar sesión con credenciales válidas
//     const username = 'admin@admin.cl';
//     const password = 'admin1';
//     const userLoged = await service.signIn(username, password);
  
//     // Como se espera que el inicio de sesión sea exitoso, debería devolver null
//     expect(userLoged).toBeNull();
//   });
  
//   // Prueba de error de conexión
  // it('Probando error de conexión', async () => {
  //   const service: This.service;
  //   // Simula un error de conexión
  //   const username = 'admin@admin.cl';
  //   const password = 'admin1';
  //   spyOn(service.afAuth, 'signInWithEmailAndPassword').and.throwError('Simulación de error de conexión')  
  //   // Intenta iniciar sesión con credenciales válidas
  //   const userLoged = await service.signIn(username, password) 
  //   // Debería devolver el mensaje de error de conexión
  //   expect(userLoged).toBe('Simulación de error de conexión');
  // });

// // Prueba de error de usuario/contraseña incorrecta
// it('Probando error de usuario/contraseña incorrecta', async () => {
//   // Simula un error de usuario/contraseña incorrecta
//   const username = 'usuario@incorrecto.com';
//   const password = 'contrasena_incorrecta';
//   spyOn(service.afAuth, 'signInWithEmailAndPassword').and.throwError('Simulación de error de usuario/contraseña incorrecta');

//   // Intenta iniciar sesión con credenciales inválidas
//   const userLoged = await service.signIn(username, password);

//   // Debería devolver el mensaje de error de usuario/contraseña incorrecta
//   expect(userLoged).toBe('Simulación de error de usuario/contraseña incorrecta');
// });

  
});
