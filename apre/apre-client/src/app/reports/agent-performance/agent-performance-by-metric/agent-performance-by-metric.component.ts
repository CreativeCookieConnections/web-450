/**
 * Author: Aisha Keller
 * Date: 06/23/2026
 * File: agent-performance-by-metric.component.ts
 * Description: Agent performance by metric type component. 
 */

import { Component } from '@angular/core';
import { CalendarComponent } from '../../../shared/calendar/calendar.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ChartComponent } from '../../../shared/chart/chart.component';
import { TableComponent } from '../../../shared/table/table.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-agent-performance-by-metric',
  standalone: true,
  imports: [CalendarComponent, CommonModule, ChartComponent, TableComponent],
  providers: [DatePipe],
  template: `
    <div>
      <h1>Agent Performance by Metric Type</h1>

      <div class="calendar-form">
        <div class="calendar-form__group">
          <div class="calendar-form__item">
            <label class="calendar-form_label" for="metricType">Metric Type:</label>
            <select class="select" id="metricType" (change)="onMetricTypeChange($event)">
              <option value="">--  Select Metric Type --</option>
              <option value="callDuration">Call Duration</option>
              <option value="callsHandled">Calls Handled</option>
              <option value="satisfactionScore">Satisfaction Score</option>
            </select>
          </div>
          <div class="calandar-form__item">
            <label class="calandar-form__label" for="startDate">Start Date:</label>
            <app-calendar (dateSelected)="onStartDateSelected($event)"></app-calendar>
          </div>
          <div class="calandar-form__item">
            <label class="calandar-form__label" for="endDate">End Date:</label>
            <app-calendar (dateSelected)="onEndDateSelected($event)"></app-calendar>
          </div>
        </div>
        <div class="calendar-form__actions">
          <button class="button button--primary" (click)="fetchPerformanceData()">Submit</button>
        </div>
      </div>

      <br />
      <div *ngIf="showChart || showTable" class="view-toggle">
        <button class="button button--primary" (click)="showChart=true; showTable=false">Chart View</button>
        <button class="button button--primary" (click)="showTable=true; showChart=false">Table View</button>
      </div>

      <div *ngIf="showChart" class="chart-container">
        <div class="card chart-card">
          <app-chart
            [type]="'bar'"
            [label]="'metricType'"
            [data]="metricValues"
            [labels]="agents">
          </app-chart>
        </div>
      </div>

      <div *ngIf="showTable">
        <app-table
          [title]="'Agent Performance - ' + metricType"
          [data]="tableData"
          [headers]="tableHeaders"
          [sortableColumns]="tableHeaders"
          [headerBackground]="'primary'">
        </app-table>
      </div>
        
    </div>
  `,
  styles: `
   .calendar-form {
    width: 70%;
    background: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    box-sizing: border-box;
    margin: 20px auto;
    min-height: 200px;
   }
   
   .calendar-form__group {
    display: flex;
    gap: 10px;
   }

   .calendar-form__item {
    flex: 1;
   }

   .calendar-form_label {
    padding-right: 10px;
  }

  .calendar-form__actions .button {
    margin-top: 10px;
    width: 100%;
  }

  .select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
  }

  .view-toggle {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .chart-container {
    width: 50%;
    margin: 0 auto;
  }

  .chart-card {
    width: 100%;
    margin: 20px 0;
  }
`
})

export class AgentPerformanceByMetricComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;
  metricType: string = '';
  agents: string[] = [];
  metricValues: number[] = [];
  tableData: any[] = [];
  tableHeaders: string[] = ['Agent', 'Value'];
  showChart: boolean = false;
  showTable: boolean = false;

  constructor(private http: HttpClient) { }
    
  onMetricTypeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.metricType = select.value;
  }

  onStartDateSelected(date: Date) {
    this.startDate = date;
    console.log('Start date selected:', date);
  }

  onEndDateSelected(date: Date) {
    if (this.startDate && date < this.startDate) {
      alert('End date must be after the start date.');
      return;
    }
    this.endDate = date;
    console.log('End date selected:', date);
  }

  fetchPerformanceData() {
    if (!this.metricType) {
      alert('Please select a metric type.');
      return;
    }

    if (this.startDate && this.endDate) {
      const startDateISO = this.startDate.toISOString();
      const endDateISO = this.endDate.toISOString();

      console.log('Fetching agent performance data for metric type:', this.metricType, startDateISO, endDateISO);

      this.http.get(`${environment.apiBaseUrl}/reports/agent-performance/by-metric-type?metricType=${this.metricType}&startDate=${startDateISO}&endDate=${endDateISO}`).subscribe({
        next: (data: any) => {
          this.agents = data[0].agents;
          this.metricValues = data[0].values;

          //Build table data from agents and values arrays
          this.tableData = this.agents.map((agent: string, index: number) => ({
            'Agent': agent,
            'Value': this.metricValues[index]
          }));

          console.log('Agents:', this.agents);
          console.log('Values:', this.metricValues);
        },

        error: (error: any) => {
          console.error('Error fetching agent performance by metric type:', error);
        },

        complete: () => {
          this.showChart = true;
          this.showTable = false;
        }
      });
    } else {
      alert('Please select both start and end dates.');
    }
  }
}
