import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCasePopupComponent } from './create-case-popup.component';

describe('CreateCasePopupComponent', () => {
  let component: CreateCasePopupComponent;
  let fixture: ComponentFixture<CreateCasePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCasePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCasePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
