import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SalesSummaryComponent } from './sales-summary.component';
import { environment } from '../../../../environments/environment';

describe('SalesSummaryComponent', () => {
  let component: SalesSummaryComponent;
  let fixture: ComponentFixture<SalesSummaryComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SalesSummaryComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SalesSummaryComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Sales Summary');
  });

  it('should fetch summary and populate regions and totals', () => {
    const mockData = [
      { region: 'North', totalSales: 100 },
      { region: 'South', totalSales: 200 }
    ];

    fixture.detectChanges(); // triggers ngOnInit

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/reports/sales/summary`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);

    expect(component.regions).toEqual(['North', 'South']);
    expect(component.totals).toEqual([100, 200]);
  });
});
