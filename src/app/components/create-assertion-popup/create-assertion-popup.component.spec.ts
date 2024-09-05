import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssertionPopupComponent } from './create-assertion-popup.component';

describe('CreateAssertionPopupComponent', () => {
  let component: CreateAssertionPopupComponent;
  let fixture: ComponentFixture<CreateAssertionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAssertionPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAssertionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
