import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoDialogComponent } from './curso-dialog.component';

describe('CursoDialogComponent', () => {
  let component: CursoDialogComponent;
  let fixture: ComponentFixture<CursoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CursoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CursoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
