import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RickAndMortyService } from './rick-and-morty.service';
import { TestBed } from '@angular/core/testing';

describe('RickAndMortyService', () => {
  let service: RickAndMortyService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RickAndMortyService],
    });

    service = TestBed.inject(RickAndMortyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería recuperar caracteres de la API a través de GET', () => {
    const mockResponse = {
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
        },
      ],
    };

    service.getCharacters().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(service['apiUrl']);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });
});
