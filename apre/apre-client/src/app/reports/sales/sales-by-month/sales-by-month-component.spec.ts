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
        expect(component).toBeTruthy();
    });

    // Test 2: should display the title "Sales by Month"
    it('should display the title "Sales by Month"', () => {
        const compiled = fixture.nativeElement
        const titleElement = compiled.querySelector('h1');
        expect(titleElement).toBeTruthy();
        expect(titleElement.textContent).toContain('Sales by Month');
    });

    // Test 3: should initialize totalSales and months as empty arrays
    it('should initialize totalSales and months as empty arrays', () => {
        expect(component.totalSales).toEqual([]);
        expect(component.months).toEqual([]);
    });
});