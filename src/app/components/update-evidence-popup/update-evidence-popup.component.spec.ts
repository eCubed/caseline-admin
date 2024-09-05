import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEvidencePopupComponent } from './update-evidence-popup.component';

describe('UpdateEvidencePopupComponent', () => {
  let component: UpdateEvidencePopupComponent;
  let fixture: ComponentFixture<UpdateEvidencePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEvidencePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEvidencePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
