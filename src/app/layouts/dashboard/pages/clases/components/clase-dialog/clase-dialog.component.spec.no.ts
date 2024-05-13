import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseDialogComponent } from './clase-dialog.component';

describe('ClaseDialogComponent', () => {
  let component: ClaseDialogComponent;
  let fixture: ComponentFixture<ClaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaseDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
