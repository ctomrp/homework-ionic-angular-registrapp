import { TestBed } from '@angular/core/testing';
import { RickAndMortyService } from './rick-and-morty.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule  } from '@angular/fire/compat/auth';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; 

describe('RickAndMortyService', () => {
  let service: RickAndMortyService;
  let testingController: HttpTestingController;

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
        AngularFireAuthModule,
        HttpClientTestingModule 
      ],
      providers: [RickAndMortyService],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(RickAndMortyService); // Inyecta el servicio
    testingController = TestBed.inject(HttpTestingController)
  });

  it('Deberia Obtener API', () => {
    const apiUrl = 'https://rickandmortyapi.com/api/character';
    const expectedData = [
        {id: 1, name: 'Rick Sanchez', species: 'Human', image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg"},
        {id: 2, name: "Morty Smith", species: 'Human', image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg"},
        {id: 3, name: "Summer Smith", species: 'Human', image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg"},
        {id: 4, name: "Beth Smith", species: 'Human', image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg"},
        {id: 5, name: "Jerry Smith", species: 'Human', image: "https://rickandmortyapi.com/api/character/avatar/5.jpeg"},
        {id: 6, name: "Abadango Cluster Princess", species: "Alien", image: "https://rickandmortyapi.com/api/character/avatar/6.jpeg"},
        {id: 7, name: "Abradolf Lincler", species: 'Human', image: "https://rickandmortyapi.com/api/character/avatar/7.jpeg"},
        {id: 8, name: "Adjudicator Rick", species: 'Human', image: "https://rickandmortyapi.com/api/character/avatar/8.jpeg"},
        {id: 9, name: "Agency Director", species: 'Human', image: "https://rickandmortyapi.com/api/character/avatar/9.jpeg"},
        {id: 10, name: "Alan Rails", species: 'Human', image: "https://rickandmortyapi.com/api/character/avatar/10.jpeg"},
        {id: 11, name: "Albert Einstein", species: 'Human', image: "https://rickandmortyapi.com/api/character/avatar/11.jpeg"},
        {id: 12, name: "Alexander", species: 'Human', image: "https://rickandmortyapi.com/api/character/avatar/12.jpeg"},
        {id: 13, name: "Alien Googah", species: "Alien", image: "https://rickandmortyapi.com/api/character/avatar/13.jpeg"},
        {id: 14, name: "Alien Morty", species: "Alien", image: "https://rickandmortyapi.com/api/character/avatar/14.jpeg"},
        {id: 15, name: "Alien Rick", species: "Alien", image: "https://rickandmortyapi.com/api/character/avatar/15.jpeg"},
        {id: 16, name: "Amish Cyborg", species: "Alien", image: "https://rickandmortyapi.com/api/character/avatar/16.jpeg"},
        {id: 17, name: "Annie", species: 'Human', image: "https://rickandmortyapi.com/api/character/avatar/17.jpeg"},
        {id: 18, name: "Antenna Morty", species: 'Human', image: "https://rickandmortyapi.com/api/character/avatar/18.jpeg"},
        {id: 19, name: "Antenna Rick", species: 'Human', image: "https://rickandmortyapi.com/api/character/avatar/19.jpeg"},
        {id: 20, name: "Ants in my Eyes Johnson", species: 'Human', image: "https://rickandmortyapi.com/api/character/avatar/20.jpeg"},
    ];

    service.getCharacters().subscribe((data) => {
      expect(data).toEqual(expectedData); // Verifica que los datos recibidos sean iguales a los esperados.
    });

    const req = testingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedData);

    testingController.verify();
  });
});
