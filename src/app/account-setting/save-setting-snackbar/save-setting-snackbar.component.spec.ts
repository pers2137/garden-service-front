import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSettingSnackbarComponent } from './save-setting-snackbar.component';

describe('SaveSettingSnackbarComponent', () => {
  let component: SaveSettingSnackbarComponent;
  let fixture: ComponentFixture<SaveSettingSnackbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveSettingSnackbarComponent]
    });
    fixture = TestBed.createComponent(SaveSettingSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
