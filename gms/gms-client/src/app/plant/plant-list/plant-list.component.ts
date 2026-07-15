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

      <button class="plant-page_button" routerLink="/plants/add">Add Plant</button>

      @if (serverMessage) {
      <div [ngClass]="{'message-alert': serverMessageType === 'error', 'message-success': serverMessageType === 'success'}">
        {{ serverMessage }}
      </div>
      }

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

  styles: `
    .plant-page {
    max-width: 80%;
    margin: 0 auto;
    padding: 20px;
  }

  .plant-page_title {
    text-align: center;
    color: #563d7c;
  }

  .plant-page_table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .plant-page_table-header {
    background-color: #FFE484;
    color: #000;
    border: 1px solid black;
    padding: 5px;
    text-align: left;
  }

  .plant-page_table-cell {
    border: 1px solid black;
    padding: 5px;
    text-align: left;
  }

  .plant-page_table-cell-functions {
    text-align: center;
  }

  .plant-page_icon-link {
    cursor: pointer;
    color: #6c757d;
    margin: 0 5px;
  }

  .plant-page_icon-link:hover {
    color: #000;
  }

  .plant-page_no-plants {
    text-align: center;
    color: #6c757d;
  }

  .plant-page_button {
    background-color: #563d7c;
    color: #fff;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 10px 2px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .plant-page_button:hover {
    background-color: #6c757d;
  }

  .message-alert {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #a94442;
    background-color: #f2dede;
    border-color: #ebccd1;
  }

  .message-success {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #3c763d;
    background-color: #dff0d8;
    border-color: #d6e9c6;
  }

  `
})
export class PlantListComponent {
  plants: Plant[] = [];
  serverMessage: string | null = null;
  serverMessageType: 'success' | 'error' | null = null;


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
        this.serverMessageType='success';
        this.serverMessage=`Plant with ID ${plantId} deleted successfully`;
        this.clearMessageAfterDelay();
      },
      error: (err: any) => {
        console.error(`Error occured while deleting plant with ID ${plantId}: ${err}`);
        this.serverMessageType='error';
        this.serverMessage=`Error occured while deleting plant with ID ${plantId}: ${err}`;
        this.clearMessageAfterDelay();
      }
    });
  }
  private clearMessageAfterDelay() {
    setTimeout(() => {
      this.serverMessage = null;
      this.serverMessageType = null;
    }, 3000);
  }
}
