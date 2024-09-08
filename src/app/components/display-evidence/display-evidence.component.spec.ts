import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayEvidenceComponent } from './display-evidence.component';

describe('DisplayEvidenceComponent', () => {
  let component: DisplayEvidenceComponent;
  let fixture: ComponentFixture<DisplayEvidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayEvidenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayEvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
