import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service'
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, BrowserAnimationsModule, SharedModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('Debe crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe desactivarse el botón de inicio de sesión si no se ingreso valores para user y password', () => {
    component.username = '';
    component.password = '';
    fixture.detectChanges();
    const loginButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(loginButton.disabled).toBeTruthy();
  });

  it('Debe activar el botón de inicio de sesión si no se ingreso valores para user y password', () => {
    component.username = 'admin';
    component.password = 'admin';
    fixture.detectChanges();
    const loginButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(loginButton.disabled).toBeFalsy();
  });

  it('Debe llamar al método de inicio de sesión con las credenciales', () => {
    const SpyOnAuthService = spyOn(authService, 'login').and.returnValue(of(true));
    // simulamos un usuario y contraseña válidos
    component.username = 'admin';
    component.password = 'admin';
    component.login();
    expect(SpyOnAuthService).toHaveBeenCalledWith('admin', 'admin');
  });

});
