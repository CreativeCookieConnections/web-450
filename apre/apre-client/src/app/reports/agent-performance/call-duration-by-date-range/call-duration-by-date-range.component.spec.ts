/**
 * Author: Aisha Keller
 * Date: June 18 2026
 * File: call-duration-by-date-range.component.spec.ts
 * Description: Unit tests for the Call Duration By Range component
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CallDurationByDateRangeComponent } from './call-duration-by-date-range.component';

describe('CallDurationByDateRangeComponent', () => {
  let component: CallDurationByDateRangeComponent;
  let fixture: ComponentFixture<CallDurationByDateRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CallDurationByDateRangeComponent] // Import CallDurationByDateRangeComponent
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallDurationByDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test 1: Should display the title "Call Duration By Date Range"
  it('should display the title "Call Duration By Date Range"', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('h1');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Call Duration By Date Range');
  });

  // Test 2: Should update endDate when onEndDateSelected is called with a valid date
  it('should update endDate when onEndDateSelected is called with a valid date', () => {
    const testStartDate = new Date('2024-08-07');
    const testEndDate = new Date('2024-08-08');
    component.startDate = testStartDate;
    component.onEndDateSelected(testEndDate);
    expect(component.endDate).toEqual(testEndDate);
  });

  // Test 3: Should have showChart set to false initially
  it('should have showChart set to false initially', () => {
    expect(component.showChart).toBeFalse();
  });
});