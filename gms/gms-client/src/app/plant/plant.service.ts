import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Plant } from './plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  constructor(private http: HttpClient) { }

  getPlants() {
    return this.http.get<Plant[]>(`${environment.apiBaseUrl}/api/plants`);
  }

  getPlant(plantId: string) {
    return this.http.get<Plant>(`${environment.apiBaseUrl}/api/plants/${plantId}`);
  }
}
