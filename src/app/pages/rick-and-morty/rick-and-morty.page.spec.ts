import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingController, NavController } from '@ionic/angular';
import { RickAndMortyPage } from './rick-and-morty.page';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

describe('RickAndMortyPage', () => {
  let component: RickAndMortyPage;
  let fixture: ComponentFixture<RickAndMortyPage>;
  let navCtrl: NavController;
  let loadingCtrl: LoadingController;
  let ramService: RickAndMortyService;

  beforeEach(() => {
    navCtrl = jasmine.createSpyObj('NavController', ['pop']);
    loadingCtrl = jasmine.createSpyObj('LoadingController', [
      'create',
      'present',
      'dismiss',
    ]);
    ramService = jasmine.createSpyObj('RickAndMortyService', ['getCharacters']);

    TestBed.configureTestingModule({
      declarations: [RickAndMortyPage],
      providers: [
        { provide: NavController, useValue: navCtrl },
        { provide: LoadingController, useValue: loadingCtrl },
        { provide: RickAndMortyService, useValue: ramService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RickAndMortyPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe navegar hacia atrás', () => {
    component.doBack();
    expect(navCtrl.pop).toHaveBeenCalled();
  });
});
