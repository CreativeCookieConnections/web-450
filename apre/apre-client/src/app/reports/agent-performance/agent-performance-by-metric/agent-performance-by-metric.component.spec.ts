/**
 * Author: Aisha Keller
 * Date: June 23 2026
 * File: agent-performance-by-metric.component.spec.ts
 * Description: Unit tests for the AgentPerformanceByMetricComponent
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AgentPerformanceByMetricComponent } from './agent-performance-by-metric.component';

describe('AgentPerformanceByMetricComponent', () => {
  let component: AgentPerformanceByMetricComponent;
  let fixture: ComponentFixture<AgentPerformanceByMetricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AgentPerformanceByMetricComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentPerformanceByMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // m-090 Test 1: should display the title "Agent Performance by Metric Type"
  it('should display the title "Agent Performance by Metric Type"', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('h1');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Agent Performance by Metric Type');
  });

  // m-090 Test 2: should update metricType when onMetricTypeChange is called
  it('should update metricType when onMetricTypeChange is called', () => {
    const mockEvent = {
      target: {
        value: 'callDuration'
      }
    } as unknown as Event;

    component.onMetricTypeChange(mockEvent);

    expect(component.metricType).toBe('callDuration');
  });

  // m-090 Test 3: should not fetch data when metricType is not selected
  it('should show alert when metricType is not selected', () => {
    spyOn(window, 'alert');

    component.metricType = '';
    component.fetchPerformanceData();

    expect(window.alert).toHaveBeenCalledWith('Please select a metric type.');
  });
});
