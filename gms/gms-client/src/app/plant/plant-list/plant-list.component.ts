import { Component } from '@angular/core';
import { PlantService } from '../plant.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-plant-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div>Plant List Component</div>
  `,
})
export class PlantListComponent {
  constructor(private plantService: PlantService) {
  }
}
