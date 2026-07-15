import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantListComponent } from './plant-list.component';
import { PlantService } from '../plant.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Plant } from '../plant';
import { By } from '@angular/platform-browser';
import { throwError, of } from 'rxjs';
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

  // Check if the component correctly handles errors when fetching plants.
  it('should handle error when fetching plants', () => {
    spyOn(plantService, 'getPlants').and.returnValue(throwError('Error fetching plants'));
    
    fixture.detectChanges(); // Trigger the component's constructor

    expect(component.plants.length).toBe(0); // Ensure no plants are loaded
  });

  // Check if the PlantListComponent correctly deletes a plant document.
  it('should delete a plant', () => {
    const mockPlants: Plant[] = [
      {_id: '1', gardenId: 1, name: 'Rose', type: 'Flower', status: 'Planted', datePlanted: '2023-01-01'},
      {_id: '2', gardenId: 1, name: 'Tulip', type: 'Flower', status: 'Planted', datePlanted: '2023-02-01'}
    ];

    spyOn(window, 'confirm').and.returnValue(true); // Mock confirm dialog to return true
    spyOn(plantService, 'deletePlant').and.returnValue(of({})); // Mock deletePlant to return an observable
    component.plants = mockPlants;

    component.deletePlant('1'); // Call deletePlant method
    fixture.detectChanges(); // Trigger change detection

    expect(component.plants.length).toBe(1); // Ensure one plant is deleted
    expect(component.plants[0]._id).toBe('2'); // Ensure the remaining plant is the correct one
  });
});
