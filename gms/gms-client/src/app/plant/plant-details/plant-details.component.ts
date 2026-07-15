import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlantService } from '../plant.service';
import { Plant } from '../plant';

@Component({
	selector: 'app-plant-details',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, RouterLink],
	template: `
		<div>
			Plant Details Component
		</div>
	`,
	styles: ``,
})
export class PlantDetailsComponent {
	plantForm: FormGroup = this.fb.group({
		name: [
			null,
			Validators.compose([Validators.required, Validators.minLength(3)]),
		],
		type: [null, Validators.required],
		status: [null, Validators.required],
	});

	constructor(
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private plantService: PlantService
	) {}
}