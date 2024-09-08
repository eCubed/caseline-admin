import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptPopupComponent } from './prompt-popup.component';

describe('PromptPopupComponent', () => {
  let component: PromptPopupComponent;
  let fixture: ComponentFixture<PromptPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
