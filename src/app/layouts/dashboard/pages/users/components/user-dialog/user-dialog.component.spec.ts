import { ComponentFixture, TestBed } from '@angular/core/testing';

import { userDialogComponent } from './user-dialog.component';


describe('userDialogComponent', () => {
  let component: userDialogComponent;
  let fixture: ComponentFixture<userDialogComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [userDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(userDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
