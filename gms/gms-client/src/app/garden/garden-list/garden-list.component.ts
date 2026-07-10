import { Component } from '@angular/core';
import { GardenService } from '../garden.service';
import { Garden } from '../garden';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-garden-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="garden-page">
      <h1 class="garden-page_title">Garden List</h1>

      <button class="garden-page_button" routerLink="/gardens/add"> Add Garden</button>

      @if (gardens && gardens.length > 0) {
        <table class="garden-page_table">
          <thead class="garden-page_table-head">
            <tr class="garden-page_table-row">
              <th class="garden-page_table-header">Garden ID</th>
              <th class="garden-page_table-header">Name</th>
              <th class="garden-page_table-header">Location</th>
              <th class="garden-page_table-header">Description</th>
              <th class="garden-page_table-header">Date Created</th>
              <th class="garden-page_table-header">Functions</th>
            </tr>
          </thead>
        <tbody class="garden-page_table-body">
          @for (garden of gardens; track garden) {
            <tr class="garden-page_table-row">
              <td class="garden-page_table-cell">{{garden.gardenId}}</td>
              <td class="garden-page_table-cell">{{garden.name}}</td>
              <td class="garden-page_table-cell">{{garden.location}}</td>
              <td class="garden-page_table-cell">{{garden.description}}</td>
              <td class="garden-page_table-cell">{{garden.dateCreated}}</td>
              <td class="garden-page_table-cell garden-page_table-cell--functions">
                <a routerLink="/gardens/{{garden.gardenId}}" class="garden-page_icon-link"><i class="fas fa-trash-alt"></i></a>
              </td>
            </tr>
          }
        </tbody>
      </table>
    } @ else {
      <p class="garden-page_no-gardens">No gardens found, consider adding one...</p>
    }
  </div>      
  `,
  styles: `
    .garden-page {
      max-width: 80%;
      margin: 0 auto;
      padding: 20px;
    }
      
    .garden-page_title {
      text-align: center;
      color: #563d7c;
    }
    
    .garden-page_table {
      width: 100%;
      border-collapse: collapse;
    }

    .garden-page_table-header {
      background-color: #FFE484;
      color: #000;
      border: 1px solid black;
      padding: 5px;
      text-align: left;
    }

    .garden-page_table-cell {
      border: 1px solid black;
      padding: 5px;
      text-align: left;
    }

    .garden-page_table-cell--functions {
      text-align: center;
    }

    .garden-page_icon-link {
      cursor: pointer;
      color: #6c757d;
      text-decoration: none;
      margin: 0 5px;
    }

    .garden-page_icon-link:hover {
      color: #000;
    }

    .garden-page_no-gardens {
      text-align: center;
      color: #6c757d;
    }

    .garden-page_button {
      background-color: #563d7c;
      color: #fff;
      border: none;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      margin: 10px 2px;
      cursor: pointer;
      border-radius: 5px;
      transition: background-color 0.3s;
    }

    .garden-page_button:hover {
      background-color: #6c757d;
    }
  `
})
export class GardenListComponent {
  gardens: Garden[] = [];
  errorMessage: string = '';

  constructor(private gardenService: GardenService) {
    this.gardenService.getGardens().subscribe({
      next: (gardens: Garden[]) => {
        this.gardens = gardens;
        console.log(`Gardens: ${JSON.stringify(this.gardens)}`);
      },
      error: (err: any) => {
        console.log(`Error occurred while retrieving gardens: ${err}`);
        this.errorMessage = err.message;
      }
    });
  }

  deleteGarden(gardenId: number) {
    alert(`Delete garden with ID: ${gardenId}`);
    
  }
}
