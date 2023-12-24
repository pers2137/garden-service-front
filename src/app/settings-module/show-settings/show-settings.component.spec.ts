import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSettingsComponent } from './show-settings.component';

describe('ShowSettingsComponent', () => {
  let component: ShowSettingsComponent;
  let fixture: ComponentFixture<ShowSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowSettingsComponent]
    });
    fixture = TestBed.createComponent(ShowSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
