import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantListComponent } from './plant-list.component';
import { PlantService } from '../plant.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';


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
});
