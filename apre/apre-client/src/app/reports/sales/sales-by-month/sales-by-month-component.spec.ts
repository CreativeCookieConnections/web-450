/**
 * Author: Aisha Keller
 * Date: June 12, 2026
 * File: sales-by-month.component.ts
 * Description: Unit tests for the SalesByMonthComponent
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SalesByMonthComponent } from './sales-by-month.component';

describe('SalesByMonthComponent', () => {
    let component: SalesByMonthComponent;
    let fixture: ComponentFixture<SalesByMonthComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, SalesByMonthComponent],
        })

        .compileComponents();

        fixture = TestBed.createComponent(SalesByMonthComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // Test 1: should create the component
    it('should create', () => {
        expect(component).toBeTruthy(); // Check if the component instance is created successfully
    });

    // Test 2: should display the title "Sales by Month"
    it('should display the title "Sales by Month"', () => {
        const compiled = fixture.nativeElement // Access the DOM element of the component
        const titleElement = compiled.querySelector('h1'); // Assuming the title is in an <h1> tag
        expect(titleElement).toBeTruthy(); // Check if the title element exists
        expect(titleElement.textContent).toContain('Sales by Month'); // Check if the title text contains "Sales by Month"
    });

    // Test 3: should initialize totalSales and months as empty arrays
    it('should initialize totalSales and months as empty arrays', () => {
        expect(component.totalSales).toEqual([]); // Check if totalSales is initialized as an empty array
        expect(component.months).toEqual([]); // Check if months is initialized as an empty array
    });
});