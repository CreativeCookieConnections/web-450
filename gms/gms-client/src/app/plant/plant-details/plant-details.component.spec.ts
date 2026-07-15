import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PlantDetailsComponent } from './plant-details.component';
import { PlantService } from '../plant.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Plant } from '../plant';

describe('PlantDetailsComponent', () => {
  let component: PlantDetailsComponent;
  let fixture: ComponentFixture<PlantDetailsComponent>;
  let plantService: PlantService;
  let router: Router;
  let activatedRoute: ActivatedRoute;


beforeEach(async () => {
  await TestBed.configureTestingModule({
  imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule, PlantDetailsComponent],
  providers: [
    PlantService,
      { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
]
}).compileComponents();


  fixture = TestBed.createComponent(PlantDetailsComponent);
  component = fixture.componentInstance;
  plantService = TestBed.inject(PlantService);
  router = TestBed.inject(Router);
  activatedRoute = TestBed.inject(ActivatedRoute);
  fixture.detectChanges();
});

it('should create', () => {
  expect(component).toBeTruthy();
  });
});
