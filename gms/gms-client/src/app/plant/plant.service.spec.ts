import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlantService } from './plant.service';
import { Plant } from './plant';
import { environment } from '../../environments/environment';




describe('PlantService', () => {
  let service: PlantService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlantService]
    });
    service = TestBed.inject(PlantService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // GET /api/plants
  it('should retrieve a list of plants from the API', () => {
    const mockPlants: Plant[] = [
      {_id: '1', gardenId: 1, name: 'Rose', type: 'Flower', status: 'Planted', datePlanted: '2023-01-01'},
      {_id: '2', gardenId: 1, name: 'Tulip', type: 'Flower', status: 'Planted', datePlanted: '2023-02-01'}
    ];

    service.getPlants().subscribe(plants => {
      expect(plants.length).toBe(2);
      expect(plants).toEqual(mockPlants);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/plants`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPlants);
  });

  // GET /api/plants/:plantId
  it('should retrieve a single plant by ID from the API', () => {
    const mockPlant: Plant = {_id: '1', gardenId: 1, name: 'Rose', type: 'Flower', status: 'Planted', datePlanted: '2023-01-01'};

    service.getPlants('1').subscribe(plant => {
      expect(plant).toEqual(mockPlant);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/plants/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPlant);
  });
});
