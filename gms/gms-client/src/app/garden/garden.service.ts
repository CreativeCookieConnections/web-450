import { Garden } from './garden';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GardenService {

  constructor(private http: HttpClient) { }

  getGardens() {
    return this.http.get<Garden[]>(`${environment.apiBaseUrl}/api/gardens`);
  }

  getGarden(gardenId: number) {
    return this.http.get<Garden>(`${environment.apiBaseUrl}/api/gardens/${gardenId}`);
  }

  addGarden(garden: Garden) {
    return this.http.post<Garden>(`${environment.apiBaseUrl}/api/gardens`, garden);
}

  updateGarden(garden: Garden) {
    return this.http.put<Garden>(`${environment.apiBaseUrl}/api/gardens/${garden.gardenId}`, garden);
  }

  deleteGarden(gardenId: number) {
    return this.http.delete(`${environment.apiBaseUrl}/api/gardens/${gardenId}`);
  }
}
