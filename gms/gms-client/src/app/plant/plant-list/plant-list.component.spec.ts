import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantListComponent } from './plant-list.component';
import { PlantService } from '../plant.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Plant } from '../plant';
import { By } from '@angular/platform-browser';
import it from '@angular/common/locales/extra/it';

describe('PlantListComponent', () => {
  let component: PlantListComponent;
  let fixture: ComponentFixture<PlantListComponent>;
  let plantService: PlantService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, PlantListComponent], // Import PlantListComponent
      providers: [PlantService] // Provide PlantService
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantListComponent);
    component = fixture.componentInstance;
    plantService = TestBed.inject(PlantService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Check if the DOM correctly displays plant documents
  it('should display records in the DOM', () => {
    const mockPlants: Plant[] = [
      {_id: '1', gardenId: 1, name: 'Rose', type: 'Flower', status: 'Planted', datePlanted: '2023-01-01'},
      {_id: '2', gardenId: 1, name: 'Tulip', type: 'Flower', status: 'Planted', datePlanted: '2023-02-01'}
    ];

    component.plants = mockPlants;
    fixture.detectChanges(); // Trigger change detection

    const plantRows = fixture.debugElement.queryAll(By.css('.plant-page_table-body .plant-page_table-row'));
    expect(plantRows.length).toBeGreaterThan(0); // Ensure there are rows in the DOM
  });
});
