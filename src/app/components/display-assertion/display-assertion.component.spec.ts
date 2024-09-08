import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAssertionComponent } from './display-assertion.component';

describe('DisplayAssertionComponent', () => {
  let component: DisplayAssertionComponent;
  let fixture: ComponentFixture<DisplayAssertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayAssertionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayAssertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
