import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginPage } from './login.page';

describe('WelcomePage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [AngularFireAuthModule],
    })
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

