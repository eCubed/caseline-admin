import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssertionPopupComponent } from './update-assertion-popup.component';

describe('UpdateAssertionPopupComponent', () => {
  let component: UpdateAssertionPopupComponent;
  let fixture: ComponentFixture<UpdateAssertionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAssertionPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAssertionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
