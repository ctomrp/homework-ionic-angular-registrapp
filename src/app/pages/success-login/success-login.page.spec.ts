import { ActivatedRoute } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { AngularFireModule } from '@angular/fire/compat';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { BehaviorSubject } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/services/login.service';
import { MessageComponent } from '../../components/message/message.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SuccessLoginPage } from './success-login.page';

describe('SuccessLoginPage', () => {
  let component: SuccessLoginPage;
  let fixture: ComponentFixture<SuccessLoginPage>;

  class MockActivatedRoute {
    private paramMapSubject = new BehaviorSubject(this.testParamMap);
    paramMap = this.paramMapSubject.asObservable();

    private _testParamMap: any;

    get testParamMap() {
      return this._testParamMap;
    }

    set testParamMap(params: any) {
      this._testParamMap = params;
      this.paramMapSubject.next(params);
    }
  }

  beforeEach(async () => {
    const mockActivatedRoute = new MockActivatedRoute();

    await TestBed.configureTestingModule({
      declarations: [SuccessLoginPage, MessageComponent],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        AsistenciaService,
        LoginService,
        BarcodeScanner,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
