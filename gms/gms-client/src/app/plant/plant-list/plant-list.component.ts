import { Component } from '@angular/core';
import { PlantService } from '../plant.service';
import { Plant } from '../plant';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-plant-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="plant-page">
      <h1 class ="plant-page_title">Plant List</h1>

      @if (plants && plants.length > 0) {
      <table *ngIf="plants && plants.length > 0" class="plant-page_table">
        <thead class="plant-page_table-head">
          <tr class="plant-page_table-row">
            <th class="plant-page_table-header">PlantID</th>
            <th class="plant-page_table-header">Name</th>
            <th class="plant-page_table-header">Type</th>
            <th class="plant-page_table-header">Status</th>
            <th class="plant-page_table-header">Date Planted</th>
          </tr>
        </thead>
        <tbody class="plant-page_table-body">
          <tr *ngFor="let plant of plants" class="plant-page_table-row">
            <td class="plant-page_table-cell">{{plant._id}}</td>
            <td class="plant-page_table-cell">{{plant.name}}</td>
            <td class="plant-page_table-cell">{{plant.type}}</td>
            <td class="plant-page_table-cell">{{plant.status}}</td>
            <td class="plant-page_table-cell">{{plant.datePlanted}}</td>
            <td class="plant-page_table-cell plant-page_table-cell-functions">
              <a routerLink="/plants/{{plant._id}}" class="plant-page_icon-link"><i class="fas fa-edit"></i></a>
              <a (click)="deletePlant(plant._id)" class="plant-page_icon-link"><i class="fas fa-trash-alt"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
    } @ else {
      <p *ngIf="!plants || plants.length === 0" class="plant-page_no-plants">No plants found, consider adding one...</p>
    }
    </div>
  `,
})
export class PlantListComponent {
  plants: Plant[] = [];


  constructor(private plantService: PlantService) {
    this.plantService.getPlants().subscribe({
      next: (plants: Plant[]) => {
        this.plants = plants;
        console.log(`Plants: ${JSON.stringify(this.plants)} `);
      },
      error: (err: any) => {
        console.error(`Error occured while retrieving plants: ${err}`);
        this.plants = [];
      }
    });
  }

  deletePlant(plantId: string) {
    if(!confirm('Are you sure you want to delete this plant?')) {
      return;
    }

    this.plantService.deletePlant(plantId).subscribe({
      next: () => {
        console.log(`Plant with ID ${plantId} deleted successfully`);
        this.plants = this.plants.filter(p=>p._id !== plantId);
      },
      error: (err: any) => {
        console.error(`Error occured while deleting plant with ID ${plantId}: ${err}`);
      }
    });
  }
}
