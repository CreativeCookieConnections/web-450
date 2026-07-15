import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { PlantService } from '../plant.service';
import { Plant } from '../plant';

@Component({
	selector: 'app-plant-details',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, RouterLink],
	template: `
		<div class="plant-details-page">
			<h1 class="plant-details-page__title">Plant Details</h1>
			<h4 class="plant-details-page__subtitle">
				Explore the detailed information about your selected plant, including its type and status.
			</h4>
			<div class="plant-details-page__card">
				<form [formGroup]="plantForm" class="plant-details-page__form">
					<div class="plant-details-page__form-group">
						<label for="name" class="plant-details-page__form-label">Plant Name</label>
						<input
							type="text"
							id="name"
							class="plant-details-page__form-control"
							formControlName="name"
						/>
					</div>
					<div class="plant-details-page__form-group">
						<label for="type" class="plant-details-page__form-label">Plant Type</label>
						<select id="type" class="plant-details-page__form-control" formControlName="type">
							<option value="Flower">Flower</option>
							<option value="Vegetable">Vegetable</option>
							<option value="Herb">Herb</option>
							<option value="Tree">Tree</option>
						</select>
					</div>
					<div class="plant-details-page__form-group">
						<label for="status" class="plant-details-page__form-label">Plant Status</label>
						<select
							id="status"
							class="plant-details-page__form-control"
							formControlName="status"
						>
							<option value="Planted">Planted</option>
							<option value="Growing">Growing</option>
							<option value="Harvested">Harvested</option>
						</select>
					</div>
					<button type="submit" class="plant-details-page__btn">Save Changes</button>
				</form>
			</div>
			<br />
			<a class="plant-details-page__link" routerLink="/plants">Return</a>
		</div>
	`,
	styles: ``
})
export class PlantDetailsComponent {
	plantId: string;
	plant: Plant;
	plantForm: FormGroup = this.fb.group({
		name: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
		type: [null, Validators.required],
		status: [null, Validators.required]
	});

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private plantService: PlantService
	) {
		this.plantId = this.route.snapshot.paramMap.get('plantId') || '';
		this.plant = {} as Plant;

		if (this.plantId === '') {
			this.router.navigate(['/plants']);
			return;
		}

		this.plantService.getPlant(this.plantId).subscribe({
			next: (plant: Plant) => {
				this.plant = plant;
				this.plantForm.setValue({
					name: plant.name,
					type: plant.type,
					status: plant.status
				});
			}
		});
	}
}