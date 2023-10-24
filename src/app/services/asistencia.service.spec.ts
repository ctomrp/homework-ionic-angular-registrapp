import { TestBed } from '@angular/core/testing';
import { AsistenciaService } from './asistencia.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('AsistenciaService', () => {
  let service: AsistenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [AsistenciaService],
    });

    service = TestBed.inject(AsistenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store attendance in Firestore', () => {
    const mockAsistencia = {
      date: new Date(),
      alumno: 'juanito arcoiris',
      asignatura: 'defensa contra las artes oscuras',
      seccion: 'dclao1',
    };

    const result = service.guardarAsistencia(mockAsistencia);
    expect(result instanceof Promise).toBeTruthy();
  });
});
