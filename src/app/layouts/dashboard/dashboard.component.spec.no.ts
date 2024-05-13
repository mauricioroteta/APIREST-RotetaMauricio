// import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
// import { DashboardComponent } from './dashboard.component';
// import { HttpClientModule } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SharedModule } from '../../shared/shared.module';
// import { FormsModule } from '@angular/forms';

// describe('DashboardComponent', () => {
// let component: DashboardComponent;
// let fixture: ComponentFixture<DashboardComponent>;
// let dashboard: DashboardComponent;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [DashboardComponent],
//       imports: [HttpClientModule, BrowserAnimationsModule, SharedModule, FormsModule]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(DashboardComponent);
//     component = fixture.componentInstance;
//     //dashboard = TestBed.inject(DashboardComponent);
//     fixture.detectChanges();
//   });

// it('Debe mostrar boton usuarios si el logueado es Admin', () => {
//   component.isAdmin = true;
//   fixture.detectChanges();
//   const button = fixture.nativeElement.querySelector('button#botonUsuarios');
//   console.log('Valor del botón:', button);
//   expect(button).toBeNull();
// });

// it('Debe ocultar boton usuarios si el logueado no es Admin', () => {
//   component.isAdmin = false;
//   fixture.detectChanges();
//   const button = fixture.nativeElement.querySelector('button#botonUsuarios');
//   console.log('Valor del botón:', button);
//   expect(button).not.toBeNull();
// });

// });


import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { SharedModule } from '../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, LoginComponent],
      imports: [HttpClientModule, SharedModule, FormsModule, BrowserAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'someValue' } } }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
