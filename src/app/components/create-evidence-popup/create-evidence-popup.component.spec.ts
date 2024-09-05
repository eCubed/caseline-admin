import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEvidencePopupComponent } from './create-evidence-popup.component';

describe('CreateEvidencePopupComponent', () => {
  let component: CreateEvidencePopupComponent;
  let fixture: ComponentFixture<CreateEvidencePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEvidencePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEvidencePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
