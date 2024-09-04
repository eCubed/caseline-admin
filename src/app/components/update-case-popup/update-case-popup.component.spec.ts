import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCasePopupComponent } from './update-case-popup.component';

describe('UpdateCasePopupComponent', () => {
  let component: UpdateCasePopupComponent;
  let fixture: ComponentFixture<UpdateCasePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCasePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCasePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
