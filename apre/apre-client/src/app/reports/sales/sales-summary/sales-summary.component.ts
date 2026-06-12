import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartComponent } from '../../../shared/chart/chart.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-sales-summary',
  standalone: true,
  imports: [ChartComponent],
  template: `
    <h1>Sales Summary</h1>
    <div *ngIf="regions.length && totals.length" class="card chart-card">
      <app-chart
        [type]="'pie'"
        [label]="'Sales by Region'"
        [data]="totals"
        [labels]="regions">
      </app-chart>
    </div>
  `,
  styles: [``]
})
export class SalesSummaryComponent implements OnInit {
  regions: string[] = [];
  totals: number[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(`${environment.apiBaseUrl}/reports/sales/summary`).subscribe({
      next: (data: any[]) => {
        this.regions = data.map(d => d.region);
        this.totals = data.map(d => d.totalSales);
      },
      error: (err) => console.error('Error fetching sales summary', err)
    });
  }
}
