/**
 * Author: Aisha Keller
 * Date: June 12, 2026
 * File: sales-by-month.component.ts
 * Description: Sales by month component for the sales report
 */

import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ChartComponent } from '../../../shared/chart/chart.component';

@Component({
    selector: 'app-sales-by-month',
    standalone: true,
    imports: [ChartComponent],
    template: `
        <h1>Sales by Month</h1>
        <div class="month-container">
            @if (totalSales.length && months.length) {
                <div class="card chart-card">
                    <app-chart
                        [type]="'bar'"
                        [label]="'Sales by Month'"
                        [data]="totalSales"
                        [labels]="months">
                    </app-chart>
                </div>
            } @else {
                <p class="no-data-message">No monthly sales data available.</p>
            }
        </div>
            `,

    styles: [`
        .month-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            }
            
            .chart-card {
                width: 50%;
                margin: 20px 0;
            }

            .no-data-message {
                color: #6b7280;
                font-weight: 600;
            }
        `]
})

export class SalesByMonthComponent implements AfterViewInit {
    totalSales: number[] = []; // Initialize totalSales as an empty array
    months: string[] = []; // Initialize months as an empty array

    constructor(
        private http: HttpClient, // Inject HttpClient to fetch data from the API
        private cdr: ChangeDetectorRef // Inject ChangeDetectorRef to trigger change detection after data is loaded
    ) {
        this.http.get(`${environment.apiBaseUrl}/reports/sales/monthly-sales`).subscribe({
            next: (data: any) => {
                this.totalSales = data.map((s: any) => s.totalSales); // Map the total sales from the API response to the totalSales array
                this.months = data.map((s: any) => s.month || 'Unknown'); // Map months and provide a fallback label when month is missing

                this.cdr.markForCheck(); // Mark the component for check to trigger change detection
                this.cdr.detectChanges(); // Trigger change detection to update the view with the new data
            },
            error: (err) => {
                console.error('Error fetching monthly sales data:', err); // Log any errors that occur during the API call
            }
        });
    }

    ngAfterViewInit(): void {} // Implement the AfterViewInit lifecycle hook, but no additional logic is needed here for this component
}